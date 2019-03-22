<<<<<<< HEAD:gamingMatchMaker/src/main/java/com/gamingMatchMaker/gamingMatchMaker/dao/LocationRepository.java
package com.gamingMatchMaker.gamingMatchMaker.dao;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.Location;

public interface LocationRepository extends JpaRepository<Location, UUID> {
	Optional<Location> findByZip(int zipCode);
}
=======
package com.gamingMatchMaker.gamingMatchMaker.dao;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.Location;

public interface LocationRepository extends JpaRepository<Location, UUID> {
	Optional<Location> findByZip(int zipCode);
}
>>>>>>> 0bce0c036e19afa536da316e96cec9ccbc1b8792:gamingMatchMaker/src/main/java/com/gamingMatchMaker/gamingMatchMaker/dao/LocationRepository.java
