#!/usr/bin/env bash
OUTPUT="code.txt"

# Clear the output file first
> "$OUTPUT"

# -type f: find only files
# ! -name "$OUTPUT": exclude the output file itself
# ! -name "*.mp4": exclude MP4 video files
# ! -path '*/.*': skip hidden files and directories (like .git)
find . -type f ! -name "$OUTPUT" ! -name "*.mp4" ! -path '*/.*' -print0 | while IFS= read -r -d '' file; do
    {
        echo "--- FILE: $file ---"
        cat "$file"
        echo -e "\n\n"
    } >> "$OUTPUT"
done

echo "Generated $OUTPUT"
