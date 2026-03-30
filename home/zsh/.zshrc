# ==========================================
# ~/.zshrc - Cleaned up for NixOS
# ==========================================

HISTFILE=~/.zsh_history
HISTSIZE=100000
SAVEHIST=100000
setopt append_history share_history hist_ignore_all_dups hist_reduce_blanks hist_ignore_space

# --- COMPLETIONS ---
zstyle ':completion:*' menu select
zstyle ':completion:*' list-colors ''

# --- ALIASES ---
alias ..="cd .."
alias ...="cd ../.."
alias c="clear"
alias open="xdg-open" 
alias gs="git status"

alias ls="eza --color=always --icons=always --group-directories-first"
alias ll="eza -lh --icons=always --group-directories-first"
alias la="eza -lah --icons=always --group-directories-first"
alias tree="eza --tree --icons=always"

alias cat="bat" # Theme is exported below
alias grep="rg"
alias find="fd"

# --- ADVANCED KEYBINDINGS ---
# history-substring-search is provided natively by Home Manager now
bindkey '^[[A' history-substring-search-up     # Up arrow 
bindkey '^[[B' history-substring-search-down   # Down arrow 
bindkey '^[[H' beginning-of-line
bindkey '^[[F' end-of-line
bindkey '^[[3~' delete-char
bindkey '^[[1;5C' forward-word
bindkey '^[[1;5D' backward-word

# --- GLOBAL THEMES ---
export BAT_THEME="tokyonight_night"

export FZF_DEFAULT_OPTS=" \
--color=bg+:#292e42,bg:#1a1b26,spinner:#9ece6a,hl:#f7768e \
--color=fg:#c0caf5,header:#f7768e,info:#bb9af7,pointer:#9ece6a \
--color=marker:#9ece6a,fg+:#c0caf5,prompt:#7aa2f7,hl+:#f7768e"

export FZF_DEFAULT_COMMAND="fd --type f --hidden --exclude .git"
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"