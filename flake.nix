{
  description = "MacOS / Interstellar style NixOS rice";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
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
	    home-manager.useUserPackages =  true;
	    home-manager.users.greyson = import ./home.nix;
	  }
	];
      };
    };
  };
}
