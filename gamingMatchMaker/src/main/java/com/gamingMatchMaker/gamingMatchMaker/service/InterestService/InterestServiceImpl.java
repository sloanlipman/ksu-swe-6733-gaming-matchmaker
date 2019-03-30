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
			names.add(i.getActivity_name());
		}
		
		//return as an array
		return names;
	}

	@Override
	public void AddInterest(String name) {
		Interest toAdd = new Interest();
		toAdd.setActivity_name(name);
		intrepo.save(toAdd); //TODO does this allow the db to create the index?
	}

}
