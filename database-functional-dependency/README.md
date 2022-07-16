# database-assignment01

### Closure
	  
	  Find all FD's for attributes a in a relation R
	 
	  a+ denotes the set of attributes that are functionally determined by a
	  
	  IF attribute(s) a IS/ARE A SUPERKEY OF R THEN a+ SHOULD BE THE WHOLE
	  RELATION R. This is our goal. Any attributes in a relation not part of
	  the closure indicates a problem with the design.
	  
	  Algorithm for Closure
	  
	  result = a; //initialize with attributes in superkey a WHILE (more changes to result)
	  DO FOREACH ( FD b → c in R) DO IF b ⊆ result //determin ant is in the set 
	   	THEN result := result ∪ c //then add dependency attribute(s)
	   	
	   	
### Find keys and the normal form

	 First Normal Form : A relation is in first normal form if every attribute
	 in that relation is singled valued Second Normal Form: To be in second
	 normal form, a relation must be in first normal form and relation must
	 not contain any partial dependency. A relation is in 2NF if it has No
	 Partial Dependency, i.e., no non-prime attribute (attributes which are
	 not part of any candidate key) is dependent on any proper subset of any
	 candidate key of the table. Example 2 – Consider following functional
	 dependencies in relation R (A, B , C, D ) AB -> C [A and B together
	 determine C] BC -> D [B and C together determine D]
	 
	 In the above relation, AB is the only candidate key and there is no
	 partial dependency, i.e., any proper subset of AB doesn’t determine any
	 non-prime attribute.
	 
	 
	 
	 Third Normal Form: ----------------
	 
	 A relation is in third normal form, if there is no transitive dependency
	 for non-prime attributes as well as it is in second normal form. A
	 relation is in 3NF if at least one of the following condition holds in
	 every non-trivial function dependency X –> Y
	 
	 X is a super key. Y is a prime attribute (each element of Y is part of
	 some candidate key).]
	 
	 Example 2 – Consider relation R(A, B, C, D, E) A -> BC, CD -> E, B -> D,
	 E -> A All possible candidate keys in above relation are {A, E, CD, BC}
	 All attribute are on right sides of all functional dependencies are
	 prime.
	 
	 Boyce-Codd Normal Form (BCNF) ---------------------------- A relation R
	 is in BCNF if R is in Third Normal Form and for every FD, LHS is super
	 key. A relation is in BCNF iff in every non-trivial functional dependency
	 X –> Y, X is a super key.
	 
	 
	 
	 Exercise 1: Find the highest normal form in R (A, B, C, D, E) under
	 following functional dependencies.
	 
	 ABC --> D CD --> AE
	 
	 Important Points for solving above type of question. 1) It is always a
	 good idea to start checking from BCNF, then 3 NF and so on. 2) If any
	 functional dependency satisfied a normal form then there is no need to
	 check for lower normal form. For example, ABC –> D is in BCNF (Note that
	 ABC is a superkey), so no need to check this dependency for lower normal
	 forms.
	 
	 Candidate keys in the given relation are {ABC, BCD}
	 
	 BCNF: ABC -> D is in BCNF. Let us check CD -> AE, CD is not a super key
	 so this dependency is not in BCNF. So, R is not in BCNF.
	 
	 3NF: ABC -> D we don’t need to check for this dependency as it already
	 satisfied BCNF. Let us consider CD -> AE. Since E is not a prime
	 attribute, so the relation is not in 3NF.
	 
	 2NF: In 2NF, we need to check for partial dependency. D which is a proper
	 subset of a candidate key and it determine E, which is non-prime
	 attribute. So, given relation is also not in 2 NF. So, the highest normal
	 form is 1 NF.
	 
	 
### How to run
   this application is compatible with jdk 8. So you show check your jdk first.
   
   Go to executable folder and download jar and run.sh script
   
   to run
   
   ./run.sh
   
   you will be shown a prompt. please take look at sample-input-output.txt file
   Any time you enter 'QUIT' and enter, application will exit.
   
  
   if you have need to set java_home path. Open run.sh and comment out the following line and modify path of you
   #export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_112.jdk/Contents/Home
   
   
   
   
   
   
   
   
   


	 
	 
	 	   	