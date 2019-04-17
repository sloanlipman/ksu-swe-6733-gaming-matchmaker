package com.gamingMatchMaker.gamingMatchMaker.dao;

import com.gamingMatchMaker.gamingMatchMaker.model.GameGenre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameGenreRepository  extends JpaRepository<GameGenre, Integer> {
    List<GameGenre> findByGenreName(String genreName);

}
