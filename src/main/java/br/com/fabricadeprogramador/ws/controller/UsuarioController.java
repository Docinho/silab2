package br.com.fabricadeprogramador.ws.controller;

import java.util.Collection;
import java.util.List;

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

import br.com.fabricadeprogramador.ws.model.Artista;
import br.com.fabricadeprogramador.ws.model.Usuario;
import br.com.fabricadeprogramador.ws.repository.UsuarioRepository;

@CrossOrigin
@RestController
public class UsuarioController {
	@Autowired
	UsuarioRepository usuarioRepository;
	
	
	@RequestMapping(method = RequestMethod.POST, value = "/usuarios", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody Usuario usuario) throws ServletException {
		
		if(usuario.getNome() == null || usuario.getEmail() == null || usuario.getSenha() == null) {
			throw new ServletException("Usuario invalido");
		}
		
		Usuario usuarioCadastrado = usuarioRepository.save(usuario);
		
		return new ResponseEntity<Usuario>(usuarioCadastrado, HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/usuarios", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Collection<Usuario>> colecaoUsuario() {
		Collection<Usuario> usuariosCadastrados = usuarioRepository.findAll();
		return new ResponseEntity<Collection<Usuario>>(usuariosCadastrados, HttpStatus.OK);
	}
	
	
	@RequestMapping(method = RequestMethod.POST, value = "/autenticar", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> autenticar(@RequestBody 	Usuario usuario) throws ServletException {
		
		
		Usuario usuarioCadastrado = usuarioRepository.acharPorEmail(usuario.getEmail());
		if(usuarioCadastrado == null) {
			throw new ServletException("Usuário não cadastrado!");
		}
		
		if(!usuarioCadastrado.getSenha().equals(usuario.getSenha())) {
			throw new ServletException("Usuário ou senha inválidos");
		}
		
		
		
		return new ResponseEntity<Usuario>(usuarioCadastrado, HttpStatus.CREATED);
	}
	
	
}
