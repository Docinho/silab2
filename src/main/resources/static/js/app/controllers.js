angular.module("modulo1")
.controller("indexController",
      function($scope, $http){
        $scope.titulo = "Sistema de Musica";
        $scope.listaArtista = [{nome: "Liam Gallagher", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4IxDsRit-p3i4rrALx0gYh2Fr6rSdYeOWkV-xHDW369VeWYBk1g",
        albuns:[], favorito: false, nota:0}];
        $scope.Artista = {nome: "", imagem: "", albuns: [], ehFavorito: false, nota:0, ultimaMusica:""};
        $scope.Musica = {nome:"", artista:"", album:"", ano:"", duracaoMusica:""};
        $scope.Album = {nome: "", imagem: "", ano:"", musicas: []}
        $scope.Playlist = {nome:"", musicas: [], num_musicas_playlist:0, duracao_playlist:0}
        $scope.artistaDaVez = {nome: "", imagem: "", albuns: [], ehFavorito: false, nota:0, ultimaMusica:""};
        $scope.albumDaVez = {nome:"", imagem:"", ano:"", artista:"", musicas:[]};
        $scope.playlistDaVez = {nome:"", musicas: [], num_musicas_playlist:0, duracao_playlist:0}
        $scope.musicaDaVez = {nome:"", artista:"", album:"", ano:"", duracao_musica:""}
        $scope.listaAlbuns = [];
        $scope.listaAlbunsArtista = [];
        $scope.listaFavoritos = [];
        $scope.listaPlaylists = [];
        $scope.listaMusicas = [];
        $scope.musicasArtistaListadas = [];
        $scope.usuariosCadastrados  = [];
        $scope.user = JSON.parse(localStorage.getItem("userInfo"));
        
        
        
        //carrega a lista de usuarios cadastrados
        $http({method:'GET', url:'http://localhost:8080/usuarios'})
          .then(function(resposta){
            $scope.usuariosCadastrados = resposta.data;
            console.log("Fez corretamente o GET", $scope.usuariosCadastrados, $scope.user);

          }, function(resposta){
            console.log(resposta.status);
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
          $scope.artistaDaVez.ultimaMusica = Musica.nome;
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

        $scope.adicionaAlbum = function(Album) {
        	
			$http.post("http://localhost:8080/usuarios/" + $scope.user.id + "/artistas/" + $scope.artistaDaVez.id + "/albuns", Album)
			.then(function (resposta){
				console.log("Sucesso " + resposta);
				Album.id = resposta.data.id;
				$scope.artistaDaVez.albuns.push(Album);
				
				
			}, function(resposta){
				console.log("Falha " + resposta);

				
			});

            
          }

        
        $scope.jaExisteAlbum = function(Album) {
          var existe = false;
          var indice = 0;
          while (indice < $scope.listaAlbuns.length && !existe) {
            if($scope.listaAlbuns[indice].nome == Album.nome) {
              naoExiste = true;
            }
          }
          return existe;
        }

        var resetAlbum = function() {
          $scope.Album = {nome:"", ano:"", musicas: []}
        }

        $scope.modalAdicionaAlbum = function() {
            $scope.Album = {nome:"", imagem:"", ano:"", musicas:[]};
            $('#cadastro-album').modal('open');
            // $scope.artistaDaVez = Artista;
        }
        
//        var atualizaAlbum = function(Album) {
//        	console.log($scope.artistaDaVez);
//        	for (var i = 0; i < $scope.user.artistas.length; i++) {
//        		console.log($scope.user.artistas[i]);
//				if($scope.user.artistas[i].nome == $scope.artistaDaVez.nome) {
//					$scope.user.artistas[i].albuns.push(Album);
//					$scope.artistaDaVez.albuns.push(Album);
//				}
//			}
//        }
        $scope.modalAdicionarArtista = function() {
          $('#modaldoartista').modal('open');
        }

        $scope.modalAdicionaPlaylist = function() {
          $('#adiciona-playlist').modal('open');
        }

        $scope.modalListaMusica = function(Album) {
          $scope.albumDaVez = Album;
          $scope.Musica = {nome:"", artista:"", album:"", ano:"", duracao_musica:""};
          $('#modalListaMusica').modal('open');
        }

        $scope.modalAdicionarMusica = function(Album) {
          setAlbumVez(Album);
          setMusica();
          $('#cadastro-musica').modal('open');
        }

        $scope.modalDestalhesArtista = function(Artista) {
          listarAlbunsArtista(Artista);
          setArtistaVez(Artista);

          $('#modalDestalhesArtista').modal('open');
        }

        $scope.modalDetalhesPlaylist = function(Playlist) {
          $scope.playlistDaVez = Playlist;
          $('#modalDetalhesPlaylist').modal('open');
        }

        $scope.modalAdicionarMusicaPlaylist = function() {
          $('#add-musica-playlist').modal('open');
        }

        var listarAlbunsArtista = function(Artista) {
          $scope.listaAlbunsArtista = Artista.albuns;
        }

        var setArtistaVez = function(Artista) {
          $scope.artistaDaVez = Artista;
        }

        var setAlbumVez = function(Album) {
          $scope.albumDaVez = Album;
        }

        var setMusica = function() {
          $scope.Musica.artista = $scope.artistaDaVez.artista;
          $scope.Musica.album = $scope.albumDaVez.nome;
          $scope.Musica.ano = $scope.albumDaVez.ano;
        }

        $scope.listaAlbunsReset = function() {
          $scope.listaAlbunsArtista = [];
        }



        $scope.excluirAlbuns = function(artista){
          for (var i = 0; i < $scope.listaAlbuns.length; i++) {
            if ($scope.listaArtista[i].artista == artista.artista) {
              $scope.listaAlbuns.splice(i,1);
            }
          }
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

        $scope.adicionaMusica = function(Musica) {

          var dur = parseInt(Musica.duracao);

          if(Musica.musica == "" || Musica.duracao== "" || !Number.isInteger(dur)) {
            Materialize.toast('Alguma informação está incorreta, tente novamente!', 3000)
          } else {
            if(!$scope.existeMusica(Musica)) {
            $scope.albumDaVez.musicas.push(Musica);
            $scope.listaMusicas.push(Musica);
            $('#modalDestalhesArtista').modal('close');
          } else {
            alert("A música " + Musica.nome + " já existe no álbum " + $scope.albumDaVez.nome);
          }
          }
            $scope.resetMusica();
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
          // $scope.resetArtistaDaVez();
          $scope.resetAlbumDaVez();
          $scope.resetMusica();
        }

        $scope.resetMusica = function () {
          $scope.Musica = {nome:"", artista:"", album:"", ano:"", duracao:""}
        }

        $scope.resetArtistaDaVez = function(){
          $scope.artistaDaVez = {nome: "", imagem: "", albuns: [], ehFavorito: false, ultimaMusica:""}
        }
        $scope.resetAlbumDaVez = function(){
            $scope.albumDaVez = {nome:"", imagem:"", ano:"", artista:"", musicas:[]};
        }

        $scope.resetPlaylist = function() {
          $scope.Playlist = {nome:"", musicas: [], num_musicas_playlist:0, duracao:0}
        }

        $scope.resetPlaylistDaVez = function() {
          $scope.playlistDaVez = {nome:"", musicas: [], num_musicas_playlist:0, duracao_playlist:0}
        }

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

        $scope.adicionaPlaylist = function(Playlist) {
          if (!jahExistePlaylist(Playlist.nome)) {
            $scope.listaPlaylists.push(Playlist);
            $scope.resetPlaylist();
          } else {
            alert("A playlist " + Playlist.nome + " já existe. Crie uma playlist com outro nome.");
          }
        }

        var jahExistePlaylist = function(NomePlaylist) {
          var achouPlaylist = false;

          for (var i = 0; i < $scope.listaPlaylists.length; i++) {
            if($scope.listaPlaylists[i].nome_playlist == NomePlaylist) {
              achouPlaylist = true;
            }
          }
          return achouPlaylist;
        }

        $scope.excluirPlaylist = function() {
          var click = confirm("Deseja mesmo excluir a playlist " + $scope.playlistDaVez.nome + "?");
          if(click) {
            $scope.excluir();
          }
        }

        $scope.excluir = function() {
          var click = confirm("Deseja excluir a playlist " + $scope.playlistDaVez + "?");
          if(click) {
          for (var i = $scope.listaPlaylists.length - 1; i> -1; i--) {
            if($scope.listaPlaylists[i] == $scope.playlistDaVez) {
              $scope.listaPlaylists.splice(i, 1);
              $('#modalDetalhesPlaylist').modal('close');
            }
          }
        }
        }

        $scope.addMusicaAPlaylist = function(Musica) {
          $scope.playlistDaVez.duracao+= parseInt(Musica.duracao_musica);
          $scope.playlistDaVez.num_musicas_playlist += 1;

          $scope.playlistDaVez.musicas.push(Musica);
          $('#modalListaMusica').modal('close');
          $scope.musicaDaVez = {nome:"", artista:"", album:"", ano:"", duracao:""};
        }

        $scope.excluirMusica = function(Musica) {
          var click = confirm("Deseja excluir a música " + Musica.nome_musica + " da playlist " + $scope.playlistDaVez.nome+ "?");
          if(click) {
            for (var i = 0; i < $scope.playlistDaVez.musicas.length; i++) {
              if($scope.playlistDaVez.musicas[i].nome_musica == Musica.nome){
                $scope.playlistDaVez.musicas.splice(i, 1);
              }
            }
          }
        }
  });
