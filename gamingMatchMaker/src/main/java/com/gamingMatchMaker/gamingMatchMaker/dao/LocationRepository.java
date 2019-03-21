package com.gamingMatchMaker.gamingMatchMaker.dao;

<<<<<<< HEAD
=======
import com.gamingMatchMaker.gamingMatchMaker.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LocationRepository extends JpaRepository<Location, UUID> {
}
=======
package com.gamingMatchMaker.gamingMatchMaker.dao;

>>>>>>> Worked up Spring Framework classes for ZipCalc.
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.Location;

public interface LocationRepository extends JpaRepository<Location, UUID> {
<<<<<<< HEAD
<<<<<<< HEAD
	Optional<Location> findByZip(String zipCode);
}
=======
 
=======
	Optional<Location> findByZip(int zipCode);
>>>>>>> Worked up Spring Framework classes for ZipCalc.
}
>>>>>>> 40876ae Adding Attribution info
>>>>>>> fixing PEBKAC moment
