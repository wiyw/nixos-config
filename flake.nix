{
  description = "MacOS / Interstellar style NixOS rice";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    # Theming framework
    stylix = {
      url = "github:nix-community/stylix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    # The community Zen Browser flake
    zen-browser.url = "github:youwen5/zen-browser-flake";
    # AGS (Aylur's GTK Shell)
    ags.url = "github:aylur/ags";
  };

  outputs = inputs@{ nixpkgs, home-manager, ... }: {
      nixosConfigurations = {
        iusenixbtw = nixpkgs.lib.nixosSystem {
          system = "x86_64-linux";
          modules = [
            ./hardware-configuration.nix
            ./configuration.nix
            home-manager.nixosModules.home-manager
            {
              home-manager.useGlobalPkgs = true;
              home-manager.useUserPackages = true;
              home-manager.extraSpecialArgs = { inherit inputs; };
              home-manager.users.greyson = import ./modules/home.nix;
            }
          ];
        };
      };
    };
}