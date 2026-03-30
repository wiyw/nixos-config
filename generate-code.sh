#!/usr/bin/env bash
OUTPUT="code.txt"

# Clear the output file
> "$OUTPUT"

# Use -o (OR) within parentheses to group exclusions
find . -type f \
    ! -name "$OUTPUT" \
    ! -name "*.mp4" \
    ! -name "*.toml" \
    ! -name ".zshrc" \
    ! -path '*/.*' \
    -print0 | while IFS= read -r -d '' file; do
    {
        echo "--- FILE: $file ---"
        cat "$file"
        echo -e "\n\n"
    } >> "$OUTPUT"
done

echo "Generated $OUTPUT"
