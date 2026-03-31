#!/usr/bin/env bash

set -e

WALLPAPER_DIR="/etc/nixos/wallpapers"
TEMP_DIR="/tmp/movie-wallpapers"

mkdir -p "$WALLPAPER_DIR"
mkdir -p "$TEMP_DIR"

declare -A MOVIE_WALLPAPERS=(
    ["hail-mary"]="https://wallpaperswide.com/project_hail_mary_2026-wallpapers.html"
    ["interstellar"]="https://wallpaperswide.com/interstellar_2014-wallpapers.html"
    ["the-martian"]="https://wallpaperswide.com/the_martian_2015-wallpapers.html"
    ["gravity"]="https://wallpaperswide.com/gravity_2013-wallpapers.html"
    ["arrival"]="https://wallpaperswide.com/arrival_2016-wallpapers.html"
)

echo "Fetching space-themed movie wallpapers..."

fetch_wallpaper() {
    local name="$1"
    local url="$2"
    local output_file="$WALLPAPER_DIR/movie-${name}.jpg"
    
    if [ -f "$output_file" ]; then
        echo "  [SKIP] $name wallpaper already exists"
        return 0
    fi
    
    echo "  [FETCH] Downloading $name wallpaper..."
    
    case "$name" in
        hail-mary)
            curl -L -o "$TEMP_DIR/${name}.jpg" "https://images.unsplash.com/photo-1614730341194-75c607400070?w=3840x2160" 2>/dev/null || true
            ;;
        interstellar)
            curl -L -o "$TEMP_DIR/${name}.jpg" "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=3840x2160" 2>/dev/null || true
            ;;
        the-martian)
            curl -L -o "$TEMP_DIR/${name}.jpg" "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=3840x2160" 2>/dev/null || true
            ;;
        gravity)
            curl -L -o "$TEMP_DIR/${name}.jpg" "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=3840x2160" 2>/dev/null || true
            ;;
        arrival)
            curl -L -o "$TEMP_DIR/${name}.jpg" "https://images.unsplash.com/photo-1506318137071-a8bcbf6755dd?w=3840x2160" 2>/dev/null || true
            ;;
    esac
    
    if [ -f "$TEMP_DIR/${name}.jpg" ] && [ -s "$TEMP_DIR/${name}.jpg" ]; then
        mv "$TEMP_DIR/${name}.jpg" "$output_file"
        echo "  [OK] Saved to $output_file"
    else
        echo "  [FAIL] Could not download $name wallpaper"
    fi
}

for movie in "${!MOVIE_WALLPAPERS[@]}"; do
    fetch_wallpaper "$movie" "${MOVIE_WALLPAPERS[$movie]}"
done

rm -rf "$TEMP_DIR"

echo ""
echo "Done! Movie wallpapers in $WALLPAPER_DIR:"
ls -la "$WALLPAPER_DIR"/movie-*.jpg 2>/dev/null || echo "No movie wallpapers found"
