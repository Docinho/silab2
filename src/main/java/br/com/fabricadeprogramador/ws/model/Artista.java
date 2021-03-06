package br.com.fabricadeprogramador.ws.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Artista implements Serializable {
	
	@Transient
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private Long id;
	private String nome;
	private String imagem;
	private String nota;
	private boolean ehFavorito;
	private String ultimaMusica;
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="Usuario_id")
	private Usuario usuario;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "artista")
	private List<Album> albuns;
	
	public Artista() {}
	
	
	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
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
	public String getImagem() {
		return imagem;
	}
	public void setImagem(String imagem) {
		this.imagem = imagem;
	}
	public String getNota() {
		return nota;
	}
	public void setNota(String nota) {
		this.nota = nota;
	}
	public boolean isEhFavorito() {
		return ehFavorito;
	}
	public void setEhFavorito(boolean ehFavorito) {
		this.ehFavorito = ehFavorito;
	}
	public String getUltimaMusica() {
		return ultimaMusica;
	}
	public void setUltimaMusica(String ultimaMusica) {
		this.ultimaMusica = ultimaMusica;
	}


	public void setAlbuns(List<Album> albuns) {
		this.albuns = albuns;
	}


	public Collection<Album> getAlbuns() {
		return albuns;
	}

	
}
