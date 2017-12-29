package br.com.fabricadeprogramador.ws.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.fabricadeprogramador.ws.model.Album;
import br.com.fabricadeprogramador.ws.model.Artista;
import br.com.fabricadeprogramador.ws.model.Usuario;
import br.com.fabricadeprogramador.ws.repository.AlbumRepository;
import br.com.fabricadeprogramador.ws.repository.ArtistaRepository;
import br.com.fabricadeprogramador.ws.repository.UsuarioRepository;

@CrossOrigin
@RestController
public class AlbumController {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	@Autowired
	private AlbumRepository albumRepository;
	@Autowired
	private ArtistaRepository artistaRepository;
	
	@RequestMapping(method = RequestMethod.PUT, value = "/usuarios/{id}/artistas/{idArtista}/album", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Album> criaAlbum(@RequestBody Album album, @PathVariable Long id, @PathVariable Long idArtista) {
		//ajeitar a musica com artista no front
		Artista artista = artistaRepository.findOne(idArtista); 
		album.setArtista(artista);
		Album albumCadastrado = albumRepository.save(album);
		return new ResponseEntity<Album>(albumCadastrado, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/usuarios/{id}/artistas/{idArtista}/album", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Album>> colecaoAlbunsArtista(@PathVariable Long idArtista) {
		//ajeitar a musica com artista no front
		Artista artista = artistaRepository.findOne(idArtista);
		Collection<Album> albuns = artista.getAlbuns();
		return new ResponseEntity<Collection<Album>>(albuns, HttpStatus.OK);
	}
	
//	@RequestMapping(method = RequestMethod.GET, value = "/usuarios/{id}/artistas/{idArtista}/album", produces = MediaType.APPLICATION_JSON_VALUE)
//	public ResponseEntity<Collection<Album>> colecaoAlbunsUsuario(@PathVariable Long id) {
//		//ajeitar a musica com artista no front
//		Usuario usuario = usuarioRepository.findOne(id);
//		Collection<Album> albuns = (Collection<Album>) usuario.getAlbuns();
//		return new ResponseEntity<Collection<Album>>(albuns, HttpStatus.OK);
//	}
}
