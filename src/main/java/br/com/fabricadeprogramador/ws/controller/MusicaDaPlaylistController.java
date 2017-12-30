package br.com.fabricadeprogramador.ws.controller;

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

import br.com.fabricadeprogramador.ws.model.Musica;
import br.com.fabricadeprogramador.ws.model.MusicaDaPlaylist;
import br.com.fabricadeprogramador.ws.model.Playlist;
import br.com.fabricadeprogramador.ws.model.Usuario;
import br.com.fabricadeprogramador.ws.repository.MusicaDaPlaylistRepository;
import br.com.fabricadeprogramador.ws.repository.PlaylistRepository;

@CrossOrigin
@RestController
public class MusicaDaPlaylistController {
	
	@Autowired
	MusicaDaPlaylistRepository musicaDaPlaylistRepository;
	
	@Autowired
	PlaylistRepository playlistRepository;
	
	
	@RequestMapping(method = RequestMethod.POST, value = "/usuarios/{id}/playlists/{id_playlist}/musicas", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MusicaDaPlaylist> cadastrarMusicaNaPlaylist(@RequestBody MusicaDaPlaylist musicaDaPlaylist, @PathVariable Long id_playlist)   {
		
		Playlist playlist = playlistRepository.findOne(id_playlist);
		musicaDaPlaylist.setPlaylist(playlist);
		MusicaDaPlaylist musicaCadastrada = musicaDaPlaylistRepository.save(musicaDaPlaylist);
		
		return new ResponseEntity<MusicaDaPlaylist>(musicaCadastrada, HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/usuarios/{id}/playlists/{id_playlist}/removermusicaplaylist", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MusicaDaPlaylist> removerMusicaNaPlaylist(@RequestBody MusicaDaPlaylist musicaDaPlaylist, @PathVariable Long id_playlist)   {
		
		
		MusicaDaPlaylist musicaRemovida  = musicaDaPlaylistRepository.acharPorNome(musicaDaPlaylist.getNome());
		
		
		if(musicaRemovida == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
		}
		
		musicaDaPlaylistRepository.delete(musicaRemovida);
		
		return new ResponseEntity<MusicaDaPlaylist>(musicaRemovida, HttpStatus.CREATED);
	}
	
	


}
