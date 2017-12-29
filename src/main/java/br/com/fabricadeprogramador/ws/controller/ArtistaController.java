package br.com.fabricadeprogramador.ws.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

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

import antlr.collections.List;
import br.com.fabricadeprogramador.ws.model.Artista;
import br.com.fabricadeprogramador.ws.model.Usuario;
import br.com.fabricadeprogramador.ws.repository.ArtistaRepository;
import br.com.fabricadeprogramador.ws.repository.UsuarioRepository;

@CrossOrigin
@RestController
public class ArtistaController {
	
	@Autowired
	ArtistaRepository artistaRepository;
	@Autowired
	UsuarioRepository usuarioRepository;
	
	@RequestMapping(method = RequestMethod.POST, value = "/usuarios/{id}/artistas", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Artista> cadastrarArtista(@RequestBody Artista artista, @PathVariable Long id) {
		Usuario usuario = usuarioRepository.findOne(id);
		
		artista.setUsuario(usuario);
		Artista artistaCadastrado = artistaRepository.save(artista);
		
		return new ResponseEntity<Artista>(artistaCadastrado, HttpStatus.CREATED);
	}
		
	@RequestMapping(method = RequestMethod.GET, value = "/usuarios/{id}/artistas", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Artista>> colecaoArtista( @PathVariable Long id) {
		Usuario usuario = usuarioRepository.findOne(id);
		Collection<Artista> listaArtistas = (Collection<Artista>) usuario.getArtistas();
		return new ResponseEntity<Collection<Artista>>(listaArtistas, HttpStatus.OK);
	}
	
	
	//(des)favorita, avalia, ultima musica
	@RequestMapping(method = RequestMethod.PUT, value = "/usuarios/{id}/artistas", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Artista> modificaArtista( @RequestBody Artista artista) {
		
		Artista artistaAlterado = artistaRepository.save(artista);
				
		return new ResponseEntity<Artista>(artistaAlterado, HttpStatus.OK);
	}
}
