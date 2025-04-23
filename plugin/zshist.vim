augroup ZSHIST_ACWRITE
  autocmd!
  autocmd BufReadCmd .zsh_history call zshist#read()
  autocmd BufWriteCmd .zsh_history call zshist#write()
augroup END
