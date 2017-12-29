package br.com.fabricadeprogramador.ws.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Album {
	
	@Id
	@GeneratedValue
	private Long id;
	private String nome;
//	private List<Musica> colecaoMusicas;
	private String ano;
//	@JsonManagedReference
//	@OneToOne(mappedBy="artista")
//	private Artista artista;
	
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

//	public Artista getArtista() {
//		return artista;
//	}
//
//	public void setArtista(Artista artista) {
//		this.artista = artista;
//	}

}
