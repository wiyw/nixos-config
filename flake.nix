{
  description = "MacOS / Interstellar style NixOS rice";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    sops-nix.url = "github:Mic92/sops-nix";

    zen-browser.url = "github:youwen5/zen-browser-flake";

    ags.url = "github:aylur/ags";
  };

  outputs = inputs@{ nixpkgs, home-manager, ... }: {
      nixosConfigurations = {
        iusenixbtw = nixpkgs.lib.nixosSystem {
          modules = [
            { nixpkgs.hostPlatform = "x86_64-linux"; } 
            ./hardware-configuration.nix
            inputs.sops-nix.nixosModules.sops
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