package br.com.fabricadeprogramador.ws.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fabricadeprogramador.ws.model.Artista;

public interface ArtistaRepository extends JpaRepository<Artista, Long>{

}
