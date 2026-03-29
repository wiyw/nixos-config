#!/usr/bin/env bash
# Generate code.txt with all config files

OUTPUT="code.txt"
> "$OUTPUT"

for file in home/*.nix home/*.js; do
    echo "$file" >> "$OUTPUT"
    cat "$file" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
done

echo "Generated $OUTPUT with $(ls home/*.nix home/*.js 2>/dev/null | wc -l) files"
