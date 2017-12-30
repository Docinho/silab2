package br.com.fabricadeprogramador.ws.controller;

import java.util.Collection;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
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
import br.com.fabricadeprogramador.ws.model.Musica;
import br.com.fabricadeprogramador.ws.repository.AlbumRepository;
import br.com.fabricadeprogramador.ws.repository.MusicaRepository;

@CrossOrigin
@RestController
public class MusicaController {
	
	@Autowired
	private MusicaRepository musicaRepository;
	@Autowired
	private AlbumRepository albumRepository;

	@RequestMapping(method = RequestMethod.POST, value = "/usuarios/{idUsuario}/artistas/{idArtista}/albuns/{idAlbuns}/musica", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Musica> cadastrarMusica(@RequestBody Musica musica, @PathVariable Long idAlbuns) throws ServletException {
		Album album = albumRepository.findOne(idAlbuns);
		musica.setAlbum(album);
		Musica musicaCadastrada = musicaRepository.save(musica);
		return new ResponseEntity<Musica>(musicaCadastrada, HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/usuarios/{idUsuario}/artistas/{idArtista}/albuns/{idAlbuns}/musica", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Musica>> colecaoMusica(@PathVariable Long idAlbuns) {
		Album album = albumRepository.findOne(idAlbuns);
		Collection<Musica> musicas = album.getMusicas();
		return new ResponseEntity(musicas, HttpStatus.OK);
	}
	
	


}
