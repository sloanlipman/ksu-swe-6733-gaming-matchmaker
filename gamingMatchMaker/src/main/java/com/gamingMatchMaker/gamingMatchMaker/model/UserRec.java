package com.gamingMatchMaker.gamingMatchMaker.model;

import com.gamingMatchMaker.gamingMatchMaker.controller.authorization.UserDetail;

import javax.persistence.*;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name="users")
public class UserRec {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "Int(11)")
    private int id;

    @Column(unique = true, nullable = false)
    private String email;
    private String first_name;
    private String last_name;
    private String password;
    private int age;
    private boolean is_active;
    private int user_type;

    @ManyToOne
    @JoinColumn(name="location_id", nullable = false)
    private Location location;

    /* Keeping this for historical perspective - but it looks like I need to do this another way
     */   
    //for the interests, join the interests table through the users_interests mapping 
    @ManyToMany(cascade = CascadeType.ALL) //save the interest with the user
    @JoinTable(
    	name = "users_interests",
    	joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "interest_id", referencedColumnName = "id")
    ) //map the interests table through the users_interests 
    private Set<Interest> hobbies = new HashSet<>();

    @ManyToMany
    private Set<GameGenre> genres;



    public UserRec() {
    }

    public UserRec(UserRec original) {
        this.email = original.email;
        this.first_name = original.first_name;
        this.last_name = original.last_name;
        this.password = original.password;
        this.age = original.age;
        this.is_active = original.is_active;
        this.user_type = original.user_type;
        this.hobbies = original.getInterests();
        this.genres = original.getGenres();
       // this.location = new Location(original.location); TODO uncomment this
       this.location = null;
    }

    public UserRec(String email, String first_name, String last_name,
                   String password, int age, boolean is_active,
                   int user_type, Location location) {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.age = age;
        this.is_active = is_active;
        this.user_type = user_type;
        this.location = location;
    }

    //replace the above construct with a non-empty interests list
    public UserRec(String email, String first_name, String last_name,
                   String password, int age, boolean is_active,
                   int user_type, Location location, Interest[] interests, GameGenre[] genres) {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.age = age;
        this.is_active = is_active;
        this.user_type = user_type;
        this.location = location;
        this.hobbies.addAll(Arrays.asList(interests));
        this.genres.addAll(Arrays.asList(genres));
    }

    public UserRec(UserDetail detail) {
        System.out.println("inside constructor, detail is " + detail);
        this.email = detail.getEmail();
        this.first_name = detail.getFirst_name();
        this.last_name = detail.getLast_name();
        this.age = detail.getAge();
        this.is_active = true;
        this.user_type = detail.getUser_type();
        // this.location = detail.getLocation();
        this.location = new Location(detail.getLocation());
        
        //TODO convert from strings (activity_names) to interests
        
    }

    /**
     * Add a new interest to the user.
     * @param I
     */
    public void AddInterest(Interest I) {
    	//TODO does this add new ones to the DB or must they already exist?
    	hobbies.add(I);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserRec userRec = (UserRec) o;
        return Objects.equals(email, userRec.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email);
    }

    public int getId() {
        return id;
    }

    public void setId(int newId) {
        this.id = newId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public boolean isIs_active() {
        return is_active;
    }

    public void setIs_active(boolean is_active) {
        this.is_active = is_active;
    }

    public int getUser_type() {
        return user_type;
    }

    public void setUser_type(int user_type) {
        this.user_type = user_type;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

	/**
	 * @return the interests
	 */
	public Set<Interest> getInterests() {
		return hobbies;
	}

	/**
	 * @param interests the interests to set
	 */
	public void setInterests(Set<Interest> interests) {
		this.hobbies = interests;
	}

    public Set<GameGenre> getGenres() {
        return genres;
    }

    public void setGenres(Set<GameGenre> genres) {
        this.genres = genres;
    }
}
