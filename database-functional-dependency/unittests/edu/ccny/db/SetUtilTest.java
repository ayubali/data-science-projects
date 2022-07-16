package edu.ccny.db;

import static org.junit.Assert.*;

import java.util.HashSet;
import java.util.Set;

import org.junit.Test;

public class SetUtilTest {

	@Test
	public void testUnionIntersectionAndDiffernce() {
		Set<Character> setA = new HashSet<>();
		setA.add('A');
		setA.add('B');
		setA.add('C');

		Set<Character> setB = new HashSet<>();
		setB.add('C');
		setB.add('D');
		setB.add('E');

		// test union
		Set<Character> unionSet = SetUtil.union(setA, setB);
		assertEquals(5, unionSet.size());

		// test intersection
		Set<Character> intersectionSet = SetUtil.intersection(setA, setB);
		assertEquals(1, intersectionSet.size());

		// test intersection
		Set<Character> differenceSet = SetUtil.difference(setA, setB);
		assertEquals(2, differenceSet.size());

	}

	@Test
	public void testIsSubset() {

		Set<Character> setA = new HashSet<>();
		setA.add('A');
		setA.add('B');
		setA.add('C');

		Set<Character> setB = new HashSet<>();
		setB.add('C');

		boolean isSubset = SetUtil.isSubset(setA, setB);
		assertTrue(isSubset);

		Set<Character> setC = new HashSet<>();
		setC.add('D');

		isSubset = SetUtil.isSubset(setA, setC);
		assertFalse(isSubset);
		
		
		Set<Character> setD = new HashSet<>();
	
		isSubset = SetUtil.isSubset(setA, setD);
		assertFalse(isSubset);
	}
	
	
	@Test
	public void testIsSuperSet() {

		Set<Character> setA = new HashSet<>();
		setA.add('A');
		setA.add('B');
		setA.add('C');

		Set<Character> setB = new HashSet<>();
		setB.add('C');

		boolean isSuperset = SetUtil.isSuperSet(setA, setB);
		assertTrue(isSuperset);

		Set<Character> setC = new HashSet<>();
		setC.add('A');
		setC.add('B');

		isSuperset = SetUtil.isSuperSet(setA, setC);
		assertTrue(isSuperset);
		
		
		Set<Character> setD = new HashSet<>();
		setD.add('E');
		isSuperset = SetUtil.isSuperSet(setA, setD);
		assertFalse(isSuperset);
	}
	
	@Test
	public void testIsMatched() {

		Set<Character> setA = new HashSet<>();
		setA.add('A');
		setA.add('B');

		Set<Character> setB = new HashSet<>();
		setB.add('B');
		setB.add('A');

		boolean isMatched = SetUtil.isMatched(setA, setB);
		assertTrue(isMatched);

		Set<Character> setC = new HashSet<>();
		setC.add('A');
		setC.add('C');

		isMatched = SetUtil.isMatched(setA, setC);
		assertFalse(isMatched);
	}
}
