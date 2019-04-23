package com.gamingMatchMaker.gamingMatchMaker.dao;

import com.gamingMatchMaker.gamingMatchMaker.model.GameGenre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GameGenreRepository  extends JpaRepository<GameGenre, Integer> {
    Optional<GameGenre> findByGenreName(String genreName);
    List<GameGenre> findByGenreNameIn(List<String> genreNames);
}
