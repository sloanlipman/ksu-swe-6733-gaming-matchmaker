package com.gamingMatchMaker.gamingMatchMaker.service.ProfileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import com.gamingMatchMaker.gamingMatchMaker.controller.SaveChangesAttempt;
import com.gamingMatchMaker.gamingMatchMaker.dao.InterestRepository;
import com.gamingMatchMaker.gamingMatchMaker.dao.LocationRepository;
import com.gamingMatchMaker.gamingMatchMaker.dao.UserRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.Interest;
import com.gamingMatchMaker.gamingMatchMaker.model.Location;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;
import com.gamingMatchMaker.gamingMatchMaker.service.authService.UserException;

@Service
public class ProfileServiceImpl implements ProfileService {

	private UserRepository phoneBook;
	private LocationRepository atlas;
	private InterestRepository hobbyLobby;
	
	@Autowired
	public ProfileServiceImpl(
			UserRepository ur, 
			LocationRepository lr, 
			InterestRepository ir) {
		this.phoneBook = ur;
		this.atlas = lr;
		this.hobbyLobby = ir;
	}
	
	/**
	 * @param id The user id for the information to retrieve.
	 */
	@Override
	public UserRec GetUserProfile(int id) throws UserException {
		Optional<UserRec> rec = phoneBook.findById(id);
		if(rec.isPresent()) return rec.get();
		else throw new UserException("No user found");
	}

	/**
	 * @param scr The wrapper for both the changes to saved and any error messsages.
	 */
	@Override
	public boolean SaveProfile(SaveChangesAttempt scr) {
		//fetch the object to update
		Optional<UserRec> rec = phoneBook.findById(scr.getUd().getId());
	
		//if we can't find the user write the error message and quit
		if(!rec.isPresent()) {
			scr.setMessage("User does not exist.  Please Register first.");
			return false;
		}

		//there's got to be a better way to do this, but screw it - GO GO BRUTE FORCE
		rec.get().setAge(scr.getUd().getAge());  //TODO validate age
		rec.get().setEmail(scr.getUd().getEmail()); //TODO validate email
		rec.get().setFirst_name(scr.getUd().getFirst_name());
		rec.get().setIs_active(scr.getUd().isIs_active());
		rec.get().setLast_name(scr.getUd().getLast_name());

		//slightly more complex than above
		Optional<Location> spot = atlas.findByZip(scr.getUd().getLocation().getZip());
		if(spot.isPresent()) {
			//save the location
			rec.get().setLocation(spot.get());
		}
		else {
			//set the error and fail
			scr.setMessage("Zipcode does not exist.");
			return false;
		}
		
		//ok, interests gets a little more interesting (<rimshot>)
		for(String s : scr.getUd().getInterests()) {
			
			//try to get the interest
			Optional<Interest> I = hobbyLobby.findByActivity(s);
			
			if(I.isPresent()) {
				//the interest exists, just tack it onto the list
				rec.get().AddInterest(I.get());
			}
			else {
				//not present, we need to add the interest first
				Interest hobby = hobbyLobby.save(new Interest(s));
				rec.get().AddInterest(hobby);
			}
		}
		
		//save the record
		phoneBook.save(rec.get());
		
		//if we've gotten here everything worked!
		return true;
	}

}
