#!/usr/bin/env python3
"""Pages payload manifest (reproducible).

Definition: every path tracked by Git (index = what the next commit/HEAD
contains) whose path has no component starting with '_' or '.', i.e. the
files GitHub Pages' default Jekyll build copies. Sizes are the blob sizes
recorded in Git. This is a model of Jekyll's EntryFilter, not a Pages build.

Usage (repository root):  python3 _tools/payload_manifest.py > _qa/payload_manifest.txt
"""
import subprocess, sys

out = subprocess.check_output(['git', 'ls-files', '-s', '-z']).decode('utf-8').split('\0')
rows = []
for line in filter(None, out):
    meta, path = line.split('\t', 1)
    sha = meta.split()[1]
    if any(part.startswith(('_', '.')) for part in path.split('/')):
        continue
    size = int(subprocess.check_output(['git', 'cat-file', '-s', sha]))
    rows.append((path, size, sha))
total = sum(r[1] for r in rows)
print(f'# payload: {len(rows)} files / {total} bytes (git blob sizes; excludes paths with a component starting with "_" or ".")')
for path, size, sha in sorted(rows):
    print(f'{size}\t{sha}\t{path}')
