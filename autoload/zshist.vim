" Unmetafy content when it is loaded
function! zshist#read() abort
  setlocal buftype=acwrite filetype=zsh_history.zsh
  let l:filepath = expand('%:p')
  let l:buffer = bufnr()
  call denops#notify('zshist', 'read', [l:filepath, l:buffer])
  set nomodified
endfunction

" Metafy content when it is saved
function! zshist#write() abort
  let l:filepath = expand('%:p')
  let l:buffer = bufnr()
  call denops#notify('zshist', 'write', [l:filepath, l:buffer])
  set nomodified
endfunction
