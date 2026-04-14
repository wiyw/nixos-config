# Setup VM with virt-manager
Download latest virtio and windows 10 install iso
Setup new for Windows 10
Make sure to configure hardware afterwards
Add virtio disk as a cdrom on add new hardware
Also add virtiofs for filesystem and link to ~/mc_transfer
Apply and go back to main screen
Turn on shared memory
Setup virtual machine (top left button)
Advanced setup and install the x86_64 drivers from the virtio iso (will say not compatible but js uncheck checkbox to fix)
Run VirtioSetup.exe or msi from the cdrom and follow prompts
Restart VM
Go into network manager and configure ipv4 addreses (8.8.8.8 and 1.1.1.1)
Update Microsoft Store (win+r then wsreset.exe)
Make sure virtio-fs Service auto starts (win+r then services.msc)
Restart VM
Install Xbox app and download minecraft launcher
Install Minecraft launcher and sign in when prompted
Install Minecraft Bedrock
Launch the game once
Close the app and find the files (C:\XboxGames\somerandomhash)
go into the content folder
Drag Minecraft.Windows.exe out onto desktop
Copy then move back to content folder
Drag whole content folder to mc_transfer
go inside of it and paste your copied Minecraft.Windows.exe
Go into C:\Windows\System32 and search game
Copy every dll into Content folder

