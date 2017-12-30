package br.com.fabricadeprogramador.ws.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Album implements Serializable{
	
	@Transient
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private Long id;
	private String nome;
	private String imagem;
//	private List<Musica> colecaoMusicas;
	private String ano;
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="Artista_id")
	private Artista artista;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "album")
	private List<Musica> musicas;

	
	public Artista getArtista() {
		return artista;
	}
	

	
	public String getImagem() {
		return imagem;
	}



	public void setImagem(String imagem) {
		this.imagem = imagem;
	}



	public Album() {}

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

	public String getAno() {
		return ano;
	}

	public void setAno(String ano) {
		this.ano = ano;
	}

	public void setArtista(Artista artista) {
		this.artista = artista;
		
	}

	public Collection<Musica> getMusicas() {
		return musicas;
	}

}
