{ config, pkgs, lib, ... }:

{
  programs.starship = {
    enable = true;
    enableZshIntegration = true;
    
    # This reads your raw TOML file and injects it natively into Home Manager
    settings = builtins.fromTOML (builtins.readFile ./zsh/starship.toml);
  };
  programs.zsh = {
    enable = true;
    enableCompletion = true;
    
    # Your core plugins from the old .zshrc!
    autosuggestion.enable = true;
    syntaxHighlighting.enable = true;
    historySubstringSearch.enable = true;

    # Inject your cleaned-up .zshrc at the end
    initExtra = builtins.readFile ./zsh/.zshrc;
  };

  # Let Home Manager handle Zoxide and FZF integrations automatically
  programs.zoxide = {
    enable = true;
    enableZshIntegration = true;
  };

  programs.fzf = {
    enable = true;
    enableZshIntegration = true;
  };
}