#!/usr/bin/env python3
"""Inspect a real Jekyll build output (_site) against the payload manifest.

Usage: python3 _tools/precheck_output.py <build_dir> [_qa/payload_manifest.txt]
Reports: files in output, forbidden paths (_qa/_tools/.github/…), expected
payload files missing, extra files produced by Jekyll, and byte identity of
files that should be copied unchanged.
"""
import hashlib, os, sys

out = sys.argv[1]
manifest = sys.argv[2] if len(sys.argv) > 2 else '_qa/payload_manifest.txt'
expected = {}
for line in open(manifest, encoding='utf-8'):
    if line.startswith('#') or not line.strip():
        continue
    size, _sha, path = line.rstrip('\n').split('\t', 2)
    expected[path] = int(size)

built = {}
for root, _dirs, files in os.walk(out):
    for f in files:
        p = os.path.relpath(os.path.join(root, f), out).replace(os.sep, '/')
        built[p] = os.path.getsize(os.path.join(root, f))

forbidden = sorted(p for p in built if any(part.startswith(('_', '.')) for part in p.split('/')))
missing = sorted(p for p in expected if p not in built and not p.endswith('.md'))
md_src = sorted(p for p in expected if p.endswith('.md'))
extra = sorted(p for p in built if p not in expected)
changed = []
for p in sorted(expected):
    if p in built and not p.endswith(('.md',)):
        a = hashlib.sha256(open(p, 'rb').read()).hexdigest()
        b = hashlib.sha256(open(os.path.join(out, p), 'rb').read()).hexdigest()
        if a != b:
            changed.append(p)

print(f'OUTPUT files={len(built)} bytes={sum(built.values())}')
print(f'EXPECTED payload files={len(expected)} bytes={sum(expected.values())}')
print(f'FORBIDDEN (_ or . paths) in output: {len(forbidden)} {forbidden}')
print(f'MISSING expected (non-.md): {len(missing)} {missing}')
print(f'.md sources (Jekyll may convert): {md_src}')
print(f'EXTRA in output: {len(extra)} {extra}')
print(f'CHANGED bytes (should be identical): {len(changed)} {changed}')
# Publish-cleanup checks (PUBLISH-CLEANUP-01)
brief_html = [p for p in built if 'MIGRATION_BRIEF' in p]
import json as _json
news = _json.load(open(os.path.join(out, 'data/news.json'), encoding='utf-8')) if 'data/news.json' in built else None
news_items = news.get('items') if isinstance(news, dict) else None
unpublished = [n for n in (news_items or []) if n.get('status') != 'published']
theme_refs = [f for f in built if f.endswith(('.html', '.css', '.js')) and 'assets/css/style.css' in open(os.path.join(out, f), encoding='utf-8', errors='ignore').read()]
print(f'MIGRATION_BRIEF in output: {len(brief_html)} {brief_html}')
print(f'data/news.json items={None if news_items is None else len(news_items)} non-published={len(unpublished)}')
print(f'theme CSS assets/css/style.css present={"assets/css/style.css" in built} referenced_by={theme_refs}')
ok = not forbidden and not missing and not changed and not brief_html and news_items is not None and not unpublished and not theme_refs
print('RESULT', 'PASS' if ok else 'FAIL')
sys.exit(0 if ok else 1)
