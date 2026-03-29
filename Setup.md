# Setup necessities
## Download Interstellar Wallpaper Video
https://drive.usercontent.google.com/download?id=1rFjfl0s_XdW0TRvn0r-8oztS8jSKWte6&export=download&authuser=0&confirm=t&uuid=834c765f-27f9-4aa7-bc6f-2f219976f597&at=AGN2oQ2UOY43Qd-P1r2zA28inwKn:1774748360846
(Credits to Wonger100 on Reddit for creating and rendering the video)

## Convert the download to mp4 for mpvwallpaper
ffmpeg -i ~/Downloads/Live.mov -vf "scale=1920:trunc(ow/a/2)*2" -c:v libx264 -preset ultrafast -c:a aac /etc/nixos/home/wallpapers/interstellar.mp4
(You may have to make directory wallpapers as if it doesnt exist it wont work)