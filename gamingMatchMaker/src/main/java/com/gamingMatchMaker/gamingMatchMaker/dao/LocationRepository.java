package com.gamingMatchMaker.gamingMatchMaker.dao;

<<<<<<< HEAD
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.Location;
=======
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.Location;

public interface LocationRepository extends JpaRepository<Location, UUID> {
	Optional<Location> findByZip(String zipCode);
}
>>>>>>> ZipCalc completed and ready to go.

public interface LocationRepository extends JpaRepository<Location, UUID> {
	Optional<Location> findByZip(String zipCode);
}