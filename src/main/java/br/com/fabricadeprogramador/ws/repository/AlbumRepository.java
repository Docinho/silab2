package br.com.fabricadeprogramador.ws.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.fabricadeprogramador.ws.model.Album;

public interface AlbumRepository extends JpaRepository<Album, Long>{

}
