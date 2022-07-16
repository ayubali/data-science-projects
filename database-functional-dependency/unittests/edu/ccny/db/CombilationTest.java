package edu.ccny.db;
import static org.junit.Assert.*;

import java.util.HashSet;
import java.util.Set;

import org.junit.Test;

import edu.ccny.db.Combination;

public class CombilationTest {

	@Test
	public void test() {
		Set<Character> set = new HashSet<>();
		set.add('A');
		set.add('B');
		set.add('C');
		set.add('D');
		set.add('E');

		Combination combination = new Combination(set);
		Set<Set<Character>> combinations = combination.gitCombinationOfLen(1);
		assertEquals(5, combinations.size());
		
		combinations = combination.gitCombinationOfLen(2);
		assertEquals(10, combinations.size());
		
	}

}
