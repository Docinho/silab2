package br.com.fabricadeprogramador.ws.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.fabricadeprogramador.ws.model.MusicaDaPlaylist;

@Repository
public interface MusicaDaPlaylistRepository  extends JpaRepository<MusicaDaPlaylist, Long>{
	
	

}
