package com.gamingMatchMaker.gamingMatchMaker.service.InterestService;

import com.gamingMatchMaker.gamingMatchMaker.service.ServiceException;

public class EmptyInterestException extends ServiceException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public EmptyInterestException() {
		super("Call to add new interest was empty.");
	}

}
