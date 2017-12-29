angular.module("modulo1")
.controller("indexController",
      function($scope, $http){
        $scope.titulo = "Sistema de Musica";
        $scope.listaArtista = [{nome_artista: "Liam Gallagher", imagem_artista: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4IxDsRit-p3i4rrALx0gYh2Fr6rSdYeOWkV-xHDW369VeWYBk1g",
        albuns:[], favorito: false, nota:0}];
        $scope.Artista = {nome_artista: "", imagem_artista: "", albuns: [], favorito: false, nota:0, ultimaMusica:""};
        $scope.Musica = {nome_musica:"", nome_artista:"", nome_album:"", ano_lancamento:"", duracao_musica:""};
        $scope.Album = {nome_artista: "", nome:"", imagem: "", ano:"", musicas: []}
        $scope.Playlist = {nome_playlist:"", musicas: [], num_musicas_playlist:0, duracao_playlist:0}
        $scope.artistaDaVez = {nome_artista: "", imagem_artista: "", albuns: [], favorito: false, nota:0, ultimaMusica:""};
        $scope.albumDaVez = {nome:"", imagem:"", ano:"", artista:"", musicas:[]};
        $scope.playlistDaVez = {nome_playlist:"", musicas: [], num_musicas_playlist:0, duracao_playlist:0}
        $scope.musicaDaVez = {nome_musica:"", nome_artista:"", nome_album:"", ano_lancamento:"", duracao_musica:""}
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
            console.log("Fez corretamente o GET");

          }, function(resposta){
            console.log(resposta.status);
          });

        $scope.fazerLogin = function(Usuario) {
        	var logou = false;
            for(i = 0; i < $scope.usuariosCadastrados.length; i++) {
              if($scope.usuariosCadastrados[i].email == Usuario.email){
                if($scope.usuariosCadastrados[i].senha == Usuario.senha) {
                  localStorage.setItem("userInfo", JSON.stringify(Usuario));
                  console.log("Logou");
                  logou = true;
                  window.location.href = "http://www.localhost:8080/index";

                  break;
                }
              }
            }
            
            if(logou == false ) {
            	alert("Email ou senha incorretos!");
            }
          }

          //duvida
//        $http({method:'PUT', url:'http://localhost:8080/usuarios'})
//          .then(function(resposta) {
//            console.log("Fez corretamente o PUT");
//          }, function(resposta) {
//            console.log(resposta.status);
//          });

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
              if(usuariosCadastrados[usuario].email == Usuario.email){
                if(usuariosCadastrados[usuario].senha == Usuario.senha) {
                  naoExiste = false;
                }
              }
            }
            return naoExiste;
          }
        $scope.setUltimaMusicaOuvida = function(Musica) {
          $scope.artistaDaVez.ultimaMusica = Musica.nome_musica;
        }

        $scope.adicionaArtista = function(Artista) {
          if (checaArtista(Artista)) {
            $scope.listaArtista.push(Artista);
          };
          $scope.Artista = [{nome_artista: "", imagem_artista: "", albuns: [], favorito: false, nota:0, ultimaMusica:""}];
        };


        $scope.atualizaArtista = function(Artista) {
          $scope.Album = {nome:"", imagem:"", ano:"", artista:"", musicas:[]};
          $scope.abrirInfoAlbum();
          $scope.artistaDaVez = Artista;

        }

        var existeArtista = function(nomeArtista, lista) {
          var artista = false;
          var artistaNaLista = 0;
          while (!artista && artistaNaLista < lista.length) {
            if(lista[artistaNaLista].nome_artista == nomeArtista){
              artista = true;
            };
            artistaNaLista++;
          };
          return artista;
        };

        var nomeVazio = function(string) {
           return !string.trim() || string.length == 0;

         };

        var editaNomeArtista = function(string, novoNome) {
          var artista = false;
          var artistaNaLista = 0;
          while (!artista && artistaNaLista < $scope.listaArtista.length) {
            if($scope.listaArtista[artistaNaLista].nome_artista == string){
              $scope.listaArtista[artistaNaLista].nome_artista = novoNome;
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
          if(!nomeVazio(Artista.nome_artista)) {
            if(!existeArtista(Artista.nome_artista, $scope.listaArtista)){
              return true;
            }else {
               Materialize.toast('Artista já existente!', 3000);
            };
          };
      };

      var resetArtista = function() {
        $scope.Artista = {nome_artista: "", imagem_artista: "", albuns: [], favorito: false, ultimaMusica:""};
      }

        $scope.adicionaAlbum = function(Album) {

          if(Album.nome == "" || angular.isNumber(Album.ano)) {
            Materialize.toast('Alguma informação está incorreta, tente novamente!', 3000);
          } if(!$scope.jaExisteAlbum(Album)){
            Album.artista = $scope.artistaDaVez.nome_artista;
            $scope.artistaDaVez.albuns.push(Album);
            $scope.listaAlbuns.push(Album);
            $scope.artistaDaVez = [{nome_artista: "", imagem_artista: "", albuns: [],ultimaMusica:""}];
            $('#modalDestalhesArtista').modal('close');
            $scope.resetAlbumDaVez();
            $scope.resetArtistaDaVez();
            }
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
          $scope.Album = {nome_artista: "", nome:"", ano:"", musicas: []}
        }

        $scope.modalAdicionaAlbum = function() {
            $scope.Album = {nome:"", imagem:"", ano:"", artista:"", musicas:[]};
            $('#cadastro-album').modal('open');
            // $scope.artistaDaVez = Artista;
        }

        $scope.modalAdicionarArtista = function() {
          $('#modaldoartista').modal('open');
        }

        $scope.modalAdicionaPlaylist = function() {
          $('#adiciona-playlist').modal('open');
        }

        $scope.modalListaMusica = function(Album) {
          $scope.albumDaVez = Album;
          $scope.Musica = {nome_musica:"", nome_artista:"", nome_album:"", ano_lancamento:"", duracao_musica:""};
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
          $scope.musicasArtistaListadas = [];

          for (var i = Artista.albuns.length - 1; i >= 0; i--) {
            for (var j = Artista.albuns[i].musicas.length - 1; j >= 0; j--) {
              $scope.musicasArtistaListadas.push(Artista.albuns[i].musicas[j]);
            }
          }
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
          $scope.Musica.nome_artista = $scope.artistaDaVez.nome_artista;
          $scope.Musica.nome_album = $scope.albumDaVez.nome;
          $scope.Musica.ano_lancamento = $scope.albumDaVez.ano;
        }

        $scope.listaAlbunsReset = function() {
          $scope.listaAlbunsArtista = [];
        }



        $scope.excluirAlbuns = function(artista){
          for (var i = 0; i < $scope.listaAlbuns.length; i++) {
            if ($scope.listaArtista[i].nome_artista == artista.nome_artista) {
              $scope.listaAlbuns.splice(i,1);
            }
          }
        }

        $scope.removeArtistaLista = function(Artista) {
          var removido = false;
          var indice = 0;
          while (indice<$scope.listaArtista.length && !removido) {
            if ($scope.listaArtista[indice].nome_artista == Artista.nome_artista) {
              $scope.listaArtista.splice(indice, 1);
              removido = true;
            }
          }
        }

        $scope.adicionaMusica = function(Musica) {

          var dur = parseInt(Musica.duracao_musica);

          if(Musica.nome_musica == "" || Musica.duracao_musica == "" || !Number.isInteger(dur)) {
            Materialize.toast('Alguma informação está incorreta, tente novamente!', 3000)
          } else {
            if(!$scope.existeMusica(Musica)) {
            $scope.albumDaVez.musicas.push(Musica);
            $scope.listaMusicas.push(Musica);
            $('#modalDestalhesArtista').modal('close');
          } else {
            alert("A música " + Musica.nome_musica + " já existe no álbum " + $scope.albumDaVez.nome);
          }
          }
            $scope.resetMusica();
        }


        $scope.existeMusica = function(Musica){
          var musicaEncontrada = false;
          for (var i = 0; i < $scope.albumDaVez.musicas.length; i++) {
            if ($scope.albumDaVez.musicas[i].nome_musica == Musica.nome_musica){
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
          $scope.Musica = {nome_musica:"", nome_artista:"", nome_album:"", ano_lancamento:"", duracao_musica:""}
        }

        $scope.resetArtistaDaVez = function(){
          $scope.artistaDaVez = {nome_artista: "", imagem_artista: "", albuns: [], favorito: false, ultimaMusica:""}
        }
        $scope.resetAlbumDaVez = function(){
            $scope.albumDaVez = {nome:"", imagem:"", ano:"", artista:"", musicas:[]};
        }

        $scope.resetPlaylist = function() {
          $scope.Playlist = {nome_playlist:"", musicas: [], num_musicas_playlist:0, duracao_playlist:0}
        }

        $scope.resetPlaylistDaVez = function() {
          $scope.playlistDaVez = {nome_playlist:"", musicas: [], num_musicas_playlist:0, duracao_playlist:0}
        }

        $scope.desfavoritaArtista = function(Artista) {
          var click = confirm("Excluir o artista " + Artista.nome_artista + " da lista de favoritos?");
          if(click){
          var i = 0;
          while(i < $scope.listaArtista.length) {
            if($scope.listaFavoritos[i].nome_artista == Artista.nome_artista) {
              $scope.listaFavoritos[i].favorito = false;
              $scope.listaFavoritos.splice(i, 1);
            }
            i++;
          }
        }

        }

        $scope.favoritaArtista = function(Artista) {
          Artista.favorito =true;
          $scope.listaFavoritos.push(Artista);
        }

        $scope.avaliaArtista = function(Nota) {
          $scope.artistaDaVez.nota = Nota;
        }

        $scope.adicionaPlaylist = function(Playlist) {
          if (!jahExistePlaylist(Playlist.nome_playlist)) {
            $scope.listaPlaylists.push(Playlist);
            $scope.resetPlaylist();
          } else {
            alert("A playlist " + Playlist.nome_playlist + " já existe. Crie uma playlist com outro nome.");
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
          var click = confirm("Deseja mesmo excluir a playlist " + $scope.playlistDaVez.nome_playlist + "?");
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
          $scope.playlistDaVez.duracao_playlist += parseInt(Musica.duracao_musica);
          $scope.playlistDaVez.num_musicas_playlist += 1;

          $scope.playlistDaVez.musicas.push(Musica);
          $('#modalListaMusica').modal('close');
          $scope.musicaDaVez = {nome_musica:"", nome_artista:"", nome_album:"", ano_lancamento:"", duracao_musica:""};
        }

        $scope.excluirMusica = function(Musica) {
          var click = confirm("Deseja excluir a música " + Musica.nome_musica + " da playlist " + $scope.playlistDaVez.nome_playlist + "?");
          if(click) {
            for (var i = 0; i < $scope.playlistDaVez.musicas.length; i++) {
              if($scope.playlistDaVez.musicas[i].nome_musica == Musica.nome_musica){
                $scope.playlistDaVez.musicas.splice(i, 1);
              }
            }
          }
        }
  });
