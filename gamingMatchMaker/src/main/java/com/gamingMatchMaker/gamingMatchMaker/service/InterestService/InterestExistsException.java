package com.gamingMatchMaker.gamingMatchMaker.service.InterestService;

import com.gamingMatchMaker.gamingMatchMaker.service.ServiceException;

public class InterestExistsException extends ServiceException {

	private String hobby;
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public InterestExistsException(String interest, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(String.format("Interest %s already exists.", interest), cause, enableSuppression, writableStackTrace);
		hobby = interest;
	}

	public InterestExistsException(String interest, Throwable cause) {
		super(String.format("Interest %s already exists.", interest), cause);
		hobby = interest;
	}

	public InterestExistsException(String interest) {
		super(String.format("Interest %s already exists.", interest));
		hobby = interest;
	}

	public String getInterest() { return hobby; }

}
