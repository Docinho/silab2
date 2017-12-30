package br.com.fabricadeprogramador.ws.controller;

import java.util.Collection;

import javax.servlet.ServletException;

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

import br.com.fabricadeprogramador.ws.model.MusicaDaPlaylist;
import br.com.fabricadeprogramador.ws.model.Playlist;
import br.com.fabricadeprogramador.ws.model.Usuario;
import br.com.fabricadeprogramador.ws.repository.MusicaDaPlaylistRepository;
import br.com.fabricadeprogramador.ws.repository.PlaylistRepository;
import br.com.fabricadeprogramador.ws.repository.UsuarioRepository;

@CrossOrigin
@RestController
public class PlaylistController {

	@Autowired
	private PlaylistRepository playlistRepository;
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private MusicaDaPlaylistRepository musicaRepository;
	
	@RequestMapping(method = RequestMethod.POST, value = "/usuarios/{id}/playlists", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Playlist> adicionarPlaylist(@RequestBody Playlist playlist, @PathVariable Long id) throws ServletException {
		Usuario usuario = usuarioRepository.findOne(id);
		playlist.setUsuario(usuario);
		Playlist playlistCadastrada = playlistRepository.save(playlist);
		
		return new ResponseEntity<Playlist>(playlistCadastrada, HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/usuarios/{id}/playlists", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Playlist>> colecaoPlaylist() {
		Collection<Playlist> usuariosCadastrados = playlistRepository.findAll();
		return new ResponseEntity<Collection<Playlist>>(usuariosCadastrados, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/usuarios/{id}/playlists/{id_playlist}/remover", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Playlist> removerplaylist(@RequestBody Playlist playlist, @PathVariable Long id_playlist)   {
		
		Playlist playlistRemovida = playlistRepository.findOne(id_playlist);
		
		if(playlistRemovida == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
		}
				
		for (int i = 0; i < playlistRemovida.getMusicas().size(); i++) {
			musicaRepository.delete(playlistRemovida.getMusicas().get(i));
		}
		playlistRepository.delete(playlistRemovida);
		
		return new ResponseEntity<Playlist>(playlistRemovida, HttpStatus.OK);
	}
}
