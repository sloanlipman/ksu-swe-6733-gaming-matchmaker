package com.gamingMatchMaker.gamingMatchMaker.service.InterestService;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gamingMatchMaker.gamingMatchMaker.dao.InterestRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.Interest;

@Service
public class InterestServiceImpl implements InterestService {
	private InterestRepository intrepo;
	
	@Autowired
	public InterestServiceImpl(InterestRepository ir) {
		this.intrepo = ir;
	}
	
	/**
	 * Returns a list of all the interests in the system.
	 */
	@Override
	public List<String> GetInterests() {
		//return value init
		List<String> names = new ArrayList<>();
		
		//fetch from db
		List<Interest> ints = intrepo.findAll();
		
		//convert to just names
		for(Interest i : ints) {
			names.add(i.getActivity());
		}
		
		//return as an array
		return names;
	}

	@Override
	public void AddInterest(String name) throws InterestExistsException, EmptyInterestException {
	
		//first do a sanity check to make sure we're actually trying to do something
		if(name.length() < 1) throw new EmptyInterestException();
		
		//check if the interest exists
		Optional<Interest> existing = intrepo.findByActivity(name);
		
		//if the interest does not exist then add it
		if(!existing.isPresent()) {
			Interest toAdd = new Interest();
			toAdd.setActivity(name);
			intrepo.save(toAdd); //TODO does this allow the db to create the index?
		}
		//already exists, kick the error back
		else {
			throw new InterestExistsException(name);
		}
		
		
	}

}
