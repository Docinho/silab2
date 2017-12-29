package br.com.fabricadeprogramador.ws.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.fabricadeprogramador.ws.model.Musica;

public class MusicaController {
	
	@RequestMapping(method = RequestMethod.PUT, value = "/usuarios/{idUsuario}/artistas/{idArtista}/album/{idAlbum}")
	public ResponseEntity adicionaMusica(@RequestBody Musica musica) {
		return null;
	}

}
