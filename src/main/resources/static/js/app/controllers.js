angular.module("modulo1")
.controller("indexController",
      function($scope, $http){
        $scope.titulo = "Sistema de Musica";
        $scope.listaArtista = [{nome: "Liam Gallagher", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4IxDsRit-p3i4rrALx0gYh2Fr6rSdYeOWkV-xHDW369VeWYBk1g",
        albuns:[], favorito: false, nota:0}];
        $scope.Artista = {nome: "", imagem: "", albuns: [], ehFavorito: false, nota:0, ultimaMusica:""};
        $scope.Musica = {nome:"", ano:"", duracao:""};
        $scope.Album = {nome: "", imagem: "", ano:"", musicas: []}
        $scope.Playlist = {nome:"", musicas:[]}
        $scope.artistaDaVez = {nome: "", imagem: "", albuns: [], ehFavorito: false, nota:0, ultimaMusica:""};
        $scope.albumDaVez = {nome:"", imagem:"", ano:"", artista:"", musicas:[]};
        $scope.playlistDaVez = {nome:"", musicas:[]}
        $scope.musicaDaVez = {nome:"", ano:"", duracao:""}
        $scope.listaAlbuns = [];
        $scope.listaAlbunsArtista = [];
        $scope.listaFavoritos = [];
        $scope.listaPlaylists = [];
        $scope.listaMusicas = [];
        $scope.musicasArtistaListadas = [];
        $scope.usuariosCadastrados  = [];
    	$scope.todasMusicas = [];
        $scope.user = JSON.parse(localStorage.getItem("userInfo"));
        
        
        
        //carrega a lista de usuarios cadastrados
        $http({method:'GET', url:'http://localhost:8080/usuarios'})
          .then(function(resposta){
            $scope.usuariosCadastrados = resposta.data;
            console.log("Fez corretamente o GET", $scope.usuariosCadastrados, $scope.user);

          }, function(resposta){
            console.log(resposta.status);
            alert("Ops! Algo de errado aconteceu");
          });

        $scope.fazerLogin = function(Usuario) {
			$http.post("http://localhost:8080/autenticar", Usuario)
			.then(function (resposta){
				console.log("Logou corretamente" + resposta);
				Usuario.id = resposta.data.id;
				Usuario.artistas = resposta.data.artistas;
				localStorage.setItem("userInfo", JSON.stringify(resposta.data));
				window.location.href = "http://localhost:8080/index";
				
				
			}, function(resposta){
				console.log("Falha " + resposta);
				
			});
          }

          $scope.registrar = function(Usuario) {
            if(naoExisteUsuario(Usuario)){
				$http.post("http://localhost:8080/usuarios", Usuario)
				.then(function (resposta){
					console.log("Registrou" + resposta);
					alert("Registro feito com sucesso! Use seu email e senha para logar!");
					window.location.href = "http://localhost:8080/login";
					
					
				}, function(resposta){
					console.log("Falha " + resposta);
					
				});
            	
            }
          };

          var naoExisteUsuario = function(Usuario) {
            naoExiste = true;
            for (let usuario = 0; usuario < $scope.usuariosCadastrados.length; usuario++) {
              if($scope.usuariosCadastrados[usuario].email == Usuario.email){
                if($scope.usuariosCadastrados[usuario].senha == Usuario.senha) {
                  naoExiste = false;
                }
              }
            }
            return naoExiste;
          }
       
         ///// Artista ////
          
        $scope.setUltimaMusicaOuvida = function(Musica) {
        	var artista = $scope.artistaDaVez;
        	artista.ultimaMusica = Musica.nome;
        	$http.post("http://localhost:8080/usuarios/" + $user.id + "/artistas", artista)
        	.then(function(resposta) {
        		console.log("Ultima musica do artista escutada adicionada com sucesso", resposta);
        	}, function(resposta) {
        		console.log("Falha na adição da ultima musica ouvida", resposta);
        	});
          
        }

        $scope.adicionaArtista = function(Artista) {
        	if(Artista.nome == "") {
        		Materialize.toast("Informações incorretas!", 2000);
        	} else {
        		if(!existeArtista(Artista.nome, $scope.user.artistas)) {
				
						
						$http.post("http://localhost:8080/usuarios/" + $scope.user.id + "/artistas", Artista)
						.then(function (resposta){
							console.log("Cadastrou o artista com sucesso " + resposta);
							Artista.id = resposta.data.id;
							console.log(Artista);
							console.log($scope.user.artistas);
							$scope.user.artistas.push(Artista);
							$('#modaldoartista').modal('close');
							$scope.Artista = {nome:"", imagem:"", nota:0, ehFavorito:false, ultimaMusica:""};
							
						}, function(resposta){
							console.log("Falha " + resposta);
						});


        		} else {
        			Materialize.toast("O artista já existe, tente cadastrar outro!", 2000);
        			$scope.Artista = {nome:"", imagem:"", nota:0, ehFavorito:false, ultimaMusica:""};
        		}
      
        	}
        }
         
        $scope.atualizaArtista = function(Artista) {
          $scope.Album = {nome:"", imagem:"", ano:"", artista:"", musicas:[]};
          $scope.abrirInfoAlbum();
          $scope.artistaDaVez = Artista;

        }

        var existeArtista = function(nomeArtista, lista) {
          var artista = false;
          if(lista != null) {
	          var artistaNaLista = 0;
	          while (!artista && artistaNaLista < lista.length) {
	            if(lista[artistaNaLista].nome == nomeArtista){
	              artista = true;
	            };
	            artistaNaLista++;
	          };
          }
          return artista;
        };

        $scope.desfavoritaArtista = function(Artista) {
            var click = confirm("Excluir o artista " + Artista.nome + " da lista de favoritos?");
            if(click){
                Artista.ehFavorito = false;
  	          $http.post("http://localhost:8080/usuarios/" + $scope.user.id + "/artistas", Artista)
  	          .then(function(resposta) {
  	        	  console.log("Artista desfavoritado: ", resposta.data);
  	          }, function(resposta) {
  	        	  console.log("Erro ", resposta);
  	          })
            }

          }

          $scope.favoritaArtista = function(Artista) {
            Artista.ehFavorito =true;
            $http.post("http://localhost:8080/usuarios/" + $scope.user.id + "/artistas", Artista)
            .then(function(resposta) {
          	  console.log("Artista favoritado: ", resposta.data);
            }, function(resposta) {
          	  console.log("Erro ", resposta);
            })
          }

          $scope.avaliaArtista = function(Nota) {
            $scope.artistaDaVez.nota = Nota;
            Artista = $scope.artistaDaVez;
            
            $http.post("http://localhost:8080/usuarios/" + $scope.user.id + "/artistas", Artista)
            .then(function(resposta) {
          	  console.log("Artista avaliado: ", resposta.data);
            }, function(resposta) {
          	  console.log("Erro ", resposta);
            })
          }
        var nomeVazio = function(string) {
           return !string.trim() || string.length == 0;

         };

        var editaNomeArtista = function(string, novoNome) {
          var artista = false;
          var artistaNaLista = 0;
          while (!artista && artistaNaLista < $scope.listaArtista.length) {
            if($scope.listaArtista[artistaNaLista].nome == string){
              $scope.listaArtista[artistaNaLista].nome= novoNome;
              artista = true;
            };
            artistaNaLista++;
          };
        };

        $scope.excluirArtista = function(Artista) {
            $scope.excluirAlbuns(Artista);
            $scope.removeArtistaLista(Artista);
        }

        var checaArtista = function(Artista) {
          if(!nomeVazio(Artista.nome)) {
            if(!existeArtista(Artista.nome, $scope.user.artistas)){
              return true;
            }else {
               Materialize.toast('Artista já existente!', 3000);
            };
          };
      };

      var resetArtista = function() {
        $scope.Artista = {nome: "", imagem: "", albuns: [], favorito: false, ultimaMusica:""};
      }

      $scope.modalAdicionarArtista = function() {
          $('#modaldoartista').modal('open');
        }
      
      $scope.modalDestalhesArtista = function(Artista) {
          $scope.listaMusicas(Artista);
          setArtistaVez(Artista);

          $('#modalDestalhesArtista').modal('open');
        }
      
      var listarAlbunsArtista = function(Artista) {
          $scope.listaAlbunsArtista = Artista.albuns;
        }

        var setArtistaVez = function(Artista) {
          $scope.artistaDaVez = Artista;
        }


      //// Album /////
        $scope.adicionaAlbum = function(Album) {
        	var invalido = false;
        	if(nomeVazio(Album.nome)) {
        		invalido = true;
        		Materialize.toast("Nome do álbum nao pode ser vazio ou nulo", 3000);
        	}
        	if(nomeVazio(Album.ano)) {
        		invalido = true;
        		Materialize.toast("Ano do álbum nao pode ser vazio ou nulo", 3000);
        	}
        	if(jaExisteAlbum(Album)){
        		invalido = true;
        		Materialize.toast("Álbum já cadastrado", 3000);
        	}
        	if(!invalido){
				$http.post("http://localhost:8080/usuarios/" + $scope.user.id + "/artistas/" + $scope.artistaDaVez.id + "/albuns", Album)
				.then(function (resposta){
					console.log("Sucesso " + resposta);
					Album.id = resposta.data.id;
					$scope.artistaDaVez.albuns.push(Album);
					
					
				}, function(resposta){
					console.log("Falha " + resposta);
	
					
				});
        	}
            
          }

        
        var jaExisteAlbum = function(Album) {
          var existe = false;
          var indice = 0;
          while (indice < $scope.artistaDaVez.albuns.length && !existe) {
            if($scope.artistaDaVez.albuns[indice].nome == Album.nome) {
              existe = true;
            }
          }
          return existe;
        }

        var resetAlbum = function() {
          $scope.Album = {nome:"", ano:"", musicas: []}
        }
        
        $scope.excluirAlbuns = function(artista){
            for (var i = 0; i < $scope.listaAlbuns.length; i++) {
              if ($scope.listaArtista[i].artista == artista.artista) {
                $scope.listaAlbuns.splice(i,1);
              }
            }
          }

        $scope.modalAdicionaAlbum = function() {
            $scope.Album = {nome:"", imagem:"", ano:"", musicas:[]};
            $('#cadastro-album').modal('open');
            // $scope.artistaDaVez = Artista;
        }
        
        var setAlbumVez = function(Album) {
            $scope.albumDaVez = Album;
          }
        
        $scope.resetAlbumDaVez = function(){
            $scope.albumDaVez = {nome:"", imagem:"", ano:"", artista:"", musicas:[]};
        }

        
        //// Playlist ////
        
        $scope.resetPlaylist = function() {
            $scope.Playlist = {nome:"", musicas:[]}
          }

          $scope.resetPlaylistDaVez = function() {
            $scope.playlistDaVez = {nome:"", musicas:[]}
          }

   

          $scope.adicionaPlaylist = function(Playlist) {
        	if(nomeVazio(Playlist.nome)){
        		Materialize.toast("Nome da playlist não pode ser vazio", 3000);
        	} else {
	            if (!jahExistePlaylist(Playlist.nome)) {
	            	console.log(Playlist);
	            	$http.post("http://localhost:8080/usuarios/" + $scope.user.id + "/playlists", Playlist)
	            	.then(function(resposta){
	            		console.log("Playlist cadastrada com sucesso, ", resposta);
	            		Playlist.id = resposta.data.id;
	            		$scope.user.playlists.push(Playlist);
	            	}, function(resposta){
	            		console.log("Falha no cadastramento da playlist", resposta);
	            	})
	              
	              $scope.resetPlaylist();
	            } else {
	              Materialize.toast("A playlist " + Playlist.nome + " já existe. Crie uma playlist com outro nome.", 3000);
	            }
        	}
          }

          var jahExistePlaylist = function(NomePlaylist) {
            var achouPlaylist = false;

            for (var i = 0; i < $scope.user.playlists.length; i++) {
              if($scope.user.playlists[i].nome == NomePlaylist) {
                achouPlaylist = true;
              }
            }
            return achouPlaylist;
          }

          $scope.removerPlaylist = function(Playlist) {
            var click = confirm("Deseja mesmo excluir a playlist " + Playlist.nome + "?");
            if(click) {
            	$http.post("http://localhost:8080/usuarios/" + $scope.user.id+ "/playlists/" + Playlist.id + "/remover", Playlist)
            	  .then(function(resposta) {
            		  console.log("Playlist deletada");
            		for (var i = $scope.user.playlists.length - 1; i> -1; i--) {
                      if($scope.user.playlists[i] == Playlist) {
                        $scope.user.playlists.splice(i, 1);
                      }
                    }
            		}, function(resposta) {
            		  console.log("Erro ao deletar playlist", resposta);
            	  });
            }
          }


          $scope.addMusicaAPlaylist = function(Musica) {
//            $scope.playlistDaVez.duracao+= parseInt(Musica.duracao_musica);
//            $scope.playlistDaVez.num_musicas_playlist += 1;
//        	  console.log($scope.playlistDaVez);
//        	  var playlist = $scope.playlistDaVez;
//        	  playlist.musicas.push(Musica);
        	  $http.post("http://localhost:8080/usuarios/" + $scope.user.id+ "/playlists/" + $scope.playlistDaVez.id + "/musicas", Musica)
        	  .then(function(resposta) {
        		  console.log("Musica adicionada na playlist");
        		  $scope.playlistDaVez.musicas.push(Musica);
        	  }, function(resposta) {
        		  console.log("Erro ao adicionar musica na playlist", resposta);
        	  })
//            $scope.playlistDaVez.musicas.push(Musica);
            $('#modalListaMusica').modal('close');
            $scope.musicaDaVez = {nome:"",  ano:"", duracao:""};
          }

          $scope.excluirMusica = function(Musica) {
            var click = confirm("Deseja excluir a música " + Musica.nome + " da playlist " + $scope.playlistDaVez.nome+ "?");
            if(click) {
            	
				$http.post("http://localhost:8080/usuarios/" + $scope.user.id + "/playlists/" + $scope.playlistDaVez.id + "/removermusicaplaylist", Musica)
				.then(function (resposta){
					console.log("Deletou a musica com sucesso " + resposta);
			         for (var i = 0; i < $scope.playlistDaVez.musicas.length; i++) {
			              if($scope.playlistDaVez.musicas[i].nome == Musica.nome){
			                $scope.playlistDaVez.musicas.splice(i, 1);
			              }
			            }
					
					
				}, function(resposta){
					console.log("Falha " + resposta);
	
					
				});
            	
            }
          }
          
          


          $scope.modalAdicionaPlaylist = function() {
          $('#adiciona-playlist').modal('open');
        }

        $scope.modalListaMusica = function(Album) {
          $scope.albumDaVez = Album;
          $scope.Musica = {nome:"", ano:"", duracao:""};
          $scope.listaTodasAsMusicas();
          $('#modalListaMusica').modal('open');
        }
        
        $scope.listaTodasAsMusicas = function() {
        	$scope.todasMusicas = [];
        	
        	for(i = 0; i < $scope.user.artistas.length; i++) {
        		for(j = 0; j < $scope.user.artistas[i].albuns.length; j++) {
        			for (k = 0; k < $scope.user.artistas[i].albuns[j].musicas.length; k++) {
        				$scope.todasMusicas.push($scope.user.artistas[i].albuns[j].musicas[k]);
        			}
        		}
        	}
        	
        	console.log($scope.todasMusicas);
        }

        $scope.modalAdicionarMusica = function(Album) {
          setAlbumVez(Album);
          setMusica();
          $('#cadastro-musica').modal('open');
        }

        

        $scope.modalDetalhesPlaylist = function(Playlist) {
          $scope.playlistDaVez = Playlist;
          $('#modalDetalhesPlaylist').modal('open');
        }

        $scope.modalAdicionarMusicaPlaylist = function() {
        	$scope.listaTodasAsMusicas();
          $('#add-musica-playlist').modal('open');
        }

       
        var setMusica = function() {

        $scope.Musica.ano = $scope.albumDaVez.ano;
        }

        $scope.listaAlbunsReset = function() {
          $scope.listaAlbunsArtista = [];
        }



       

        $scope.removeArtistaLista = function(Artista) {
          var removido = false;
          var indice = 0;
          while (indice<$scope.listaArtista.length && !removido) {
            if ($scope.listaArtista[indice].artista == Artista.artista) {
              $scope.listaArtista.splice(indice, 1);
              removido = true;
            }
          }
        }

        //// Musica ////
        $scope.adicionaMusica = function(Musica) {
        	var dur = parseInt(Musica.duracao);
        	if(Musica.nome == "" || Musica.duracao== "" || !Number.isInteger(dur)) {
                Materialize.toast('Alguma informação está incorreta, tente novamente!', 3000);
        	}else{
            	if($scope.existeMusica(Musica)) {
                	Materialize.toast('A Musica já existe no album!', 3000);
                
        		} else {
        			$http.post("http://localhost:8080/usuarios/"+$scope.user.id+"/artistas/"+$scope.artistaDaVez.id+"/albuns/"+$scope.albumDaVez.id+"/musica", Musica)
        			.then(function (resposta){
        				console.log("Cadastrou a musica com sucesso " + resposta);
						Musica.id = resposta.data.id;
						$scope.albumDaVez.musicas.push(Musica);
					
					
					}, function(resposta){
						console.log("Falha " + resposta);
		
						
					});
        		}
        	}
       }


        $scope.existeMusica = function(Musica){
          var musicaEncontrada = false;
          for (var i = 0; i < $scope.albumDaVez.musicas.length; i++) {
            if ($scope.albumDaVez.musicas[i].nome == Musica.nome){
              musicaEncontrada = true;
            }
        }
        return musicaEncontrada;
      }
        $scope.adicionaMusicaAlbum = function(inMusica){
          var i = 0;
          var albumEncontrado = false;
          while(i < $scope.albumDaVez.musicas.length && !albumEncontrado){
            if ($scope.listaAlbum[i].nome == $scope.albumDaVez.nome) {
              $scope.listaAlbum[i].musicas.push(Musica);
            }
          }
        }

        $scope.resetAddMusica = function() {
          $scope.resetAlbumDaVez();
          $scope.resetMusica();
        }

        $scope.resetMusica = function () {
          $scope.Musica = {nome:"", ano:"", duracao:""}
        }

        $scope.resetArtistaDaVez = function(){
          $scope.artistaDaVez = {nome: "", imagem: "", albuns: [], ehFavorito: false, ultimaMusica:""}
        }
       
        $scope.listaMusicas = function() {
        	$scope.musicasArtistaListadas = [];
        	for(i = 0; i < $scope.artistaDaVez.albuns.length ; i++) {
        		for(j = 0; j < $scope.artistaDaVez.albuns[i].musicas.length; j++) {
        			$scope.musicasArtistaListadas.push($scope.artistaDaVez.albuns[i].musicas[j]);
        		}
        	}
        	console.log($scope.musicasArtistaListadas)
        }
    });
