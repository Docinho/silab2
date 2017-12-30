package br.com.fabricadeprogramador.ws.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.fabricadeprogramador.ws.model.MusicaDaPlaylist;
import br.com.fabricadeprogramador.ws.model.Usuario;

@Repository
public interface MusicaDaPlaylistRepository  extends JpaRepository<MusicaDaPlaylist, Long>{
	
	
	@Query(value="Select u from MusicaDaPlaylist u where u.nome=:pnome")
	public MusicaDaPlaylist acharPorNome(@Param("pnome") String nome);
}
