package br.com.fabricadeprogramador.ws.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Usuario {
	
	@Id
	@GeneratedValue
	private Long id;
	private String nome;
	private String email;
	private String senha;
	
	
	@JsonManagedReference
	@OneToMany(mappedBy="usuario")
	private List<Artista> artistas;

	
	public Usuario() {
		
	}
	
	
	
	public List<Artista> getArtistas() {
		return artistas;
	}



	public void setArtistas(List<Artista> artistas) {
		this.artistas = artistas;
	}



	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	public List<Artista> getMusicas() {
		return artistas;
	}



	public Collection<Album> getAlbuns() {
		// TODO Auto-generated method stub
		return null;
	}

	}
