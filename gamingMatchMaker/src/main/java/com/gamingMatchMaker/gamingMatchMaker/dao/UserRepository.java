package com.gamingMatchMaker.gamingMatchMaker.dao;

import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserRec, UUID> {
    Optional<UserRec> findByEmail(String email);
    Optional<UserRec> findById(int id);

    List<UserRec> findByGenres_Id(int id);
    List<UserRec> findByGenres_IdIn(List<Integer> idList);
}
