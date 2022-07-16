package edu.ccny.db;

import static org.junit.Assert.*;

import java.util.LinkedHashSet;
import java.util.Set;

import org.junit.Test;

public class DBUtilTest {
	
	@Test
	public void testKeys1() {
		Relation relation = new Relation("WHOSE");
		relation.addFD(SetUtil.getSet("WH"), SetUtil.getSet("S"));
		relation.addFD(SetUtil.getSet("HOS"), SetUtil.getSet("E"));
		DBUtil.findKeys(relation);
		Set<Set<Character>> keys = relation.getKeys();
		assertEquals(1, keys.size());
		
		Set<Character> key = (Set<Character>) keys.toArray()[0];
		Set<Character> expectedKey = SetUtil.getSet("HOW");
		assertEquals(expectedKey, key);
		
		Set<Character> closureSetWH = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("WH"));
		assertEquals(SetUtil.getSet("HSW"), closureSetWH);
		
		Set<Character> closureSetHOS = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("HOS"));
		assertEquals(SetUtil.getSet("HOSE"), closureSetHOS);
		
		Set<Character> closureSetW = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("W"));
		assertEquals(SetUtil.getSet("W"), closureSetW);
		
	}
	
	
	@Test
	public void testKeys2() {
		Relation relation = new Relation("ABCDEFG");
		relation.addFD(SetUtil.getSet("AB"), SetUtil.getSet("F"));
		relation.addFD(SetUtil.getSet("AD"), SetUtil.getSet("E"));
		relation.addFD(SetUtil.getSet("F"), SetUtil.getSet("G"));
		DBUtil.findKeys(relation);
		Set<Set<Character>> keys = relation.getKeys();;
		assertEquals(1, keys.size());
		
		Set<Character> key = (Set<Character>) keys.toArray()[0];
		Set<Character> expectedKey = SetUtil.getSet("ABCD");
		assertEquals(expectedKey, key);
		
		
		Set<Character> closureSetAB = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("AB"));	
		assertEquals(SetUtil.getSet("ABFG"), closureSetAB);
		
		
		Set<Character> closureSetAD = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("AD"));
		assertEquals(SetUtil.getSet("ADE"), closureSetAD);
	}

	
	@Test
	public void testKeys3() {
		Relation relation = new Relation("ABCD");
		relation.addFD(SetUtil.getSet("A"), SetUtil.getSet("BCD"));
		relation.addFD(SetUtil.getSet("C"), SetUtil.getSet("A"));

		DBUtil.findKeys(relation);
		Set<Set<Character>> keys = relation.getKeys();;
		assertEquals(2, keys.size());
		
		
		assertTrue(keys.contains(SetUtil.getSet("A")));
		assertTrue(keys.contains(SetUtil.getSet("C")));
		
		
		Set<Character> closureSetA = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("A"));	
		assertEquals(SetUtil.getSet("ABCD"), closureSetA);
		
		
		Set<Character> closureSetC = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("AD"));
		assertEquals(SetUtil.getSet("ABCD"), closureSetC);
	}
	
	
	@Test
	public void testKey4() {
		Relation relation = new Relation("ABCDEFG");
		relation.addFD(SetUtil.getSet("AB"), SetUtil.getSet("F"));
		relation.addFD(SetUtil.getSet("AD"), SetUtil.getSet("E"));
		relation.addFD(SetUtil.getSet("F"), SetUtil.getSet("G"));

		DBUtil.findKeys(relation);
		Set<Set<Character>> keys = relation.getKeys();
		assertEquals(1, keys.size());
		
		
		assertTrue(keys.contains(SetUtil.getSet("ABCD")));		
		
		Set<Character> closureSetAB = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("AB"));	
		assertEquals(SetUtil.getSet("ABFG"), closureSetAB);
		
		
		Set<Character> closureSetAD = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("AD"));
		assertEquals(SetUtil.getSet("ADE"), closureSetAD);
	}
	
	

	@Test
	public void testKey5() {
		
		Relation relation = new Relation("ABCD");
		relation.addFD(SetUtil.getSet("ABC"), SetUtil.getSet("D"));
		relation.addFD(SetUtil.getSet("D"), SetUtil.getSet("A"));
	

		DBUtil.findKeys(relation);
		Set<Set<Character>> keys = relation.getKeys();
		assertEquals(2, keys.size());
		
		
		assertTrue(keys.contains(SetUtil.getSet("ABC")));	
		assertTrue(keys.contains(SetUtil.getSet("BCD")));
		
		Set<Character> closureSetAB = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("ABC"));	
		assertEquals(SetUtil.getSet("ABCD"), closureSetAB);
		
		
		Set<Character> closureSetAD = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("D"));
		assertEquals(SetUtil.getSet("AD"), closureSetAD);
	}
	
	
	@Test
	public void testKey6() {
		Relation relation = new Relation("ABCDEF");
		relation.addFD(SetUtil.getSet("DF"), SetUtil.getSet("C"));
		relation.addFD(SetUtil.getSet("BC"), SetUtil.getSet("F"));
		relation.addFD(SetUtil.getSet("E"), SetUtil.getSet("A"));
		relation.addFD(SetUtil.getSet("ABC"), SetUtil.getSet("E"));
	

		DBUtil.findKeys(relation);
		Set<Set<Character>> keys = relation.getKeys();
		assertEquals(4, keys.size());
		
		
		assertTrue(keys.contains(SetUtil.getSet("ABCD")));	
		assertTrue(keys.contains(SetUtil.getSet("ABDF")));
		assertTrue(keys.contains(SetUtil.getSet("BCDE")));
		assertTrue(keys.contains(SetUtil.getSet("BDEF")));
		
		Set<Character> closureSetABC = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("ABC"));
		assertEquals(SetUtil.getSet("ABCEF"), closureSetABC);
		
		
		Set<Character> closureSetAD = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("ABCD"));
		assertEquals(SetUtil.getSet("ABCDEF"), closureSetAD);
	}
	
	
	
	@Test
	public void testKey7() {
		
		Relation relation = new Relation("ABCDE");
		relation.addFD(SetUtil.getSet("A"), SetUtil.getSet("BC"));
		relation.addFD(SetUtil.getSet("CD"), SetUtil.getSet("E"));
		relation.addFD(SetUtil.getSet("B"), SetUtil.getSet("D"));
		relation.addFD(SetUtil.getSet("E"), SetUtil.getSet("A"));
	

		DBUtil.findKeys(relation);
		Set<Set<Character>> keys = relation.getKeys();
		assertEquals(4, keys.size());
		
        
		assertTrue(keys.contains(SetUtil.getSet("A")));	
		assertTrue(keys.contains(SetUtil.getSet("E")));
		assertTrue(keys.contains(SetUtil.getSet("BC")));
		assertTrue(keys.contains(SetUtil.getSet("CD")));
		
		Set<Character> closureSetA = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("A"));
		assertEquals(SetUtil.getSet("ABCDE"), closureSetA);
		
		
		Set<Character> closureSetBC = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("BC"));
		assertEquals(SetUtil.getSet("ABCDE"), closureSetBC);
	}
	
	
	@Test
	public void testKey8() {
		
		Relation relation = new Relation("ABCD");
		relation.addFD(SetUtil.getSet("AB"), SetUtil.getSet("CD"));

		DBUtil.findKeys(relation);
		Set<Set<Character>> keys = relation.getKeys();
		assertEquals(1, keys.size());
        
		assertTrue(keys.contains(SetUtil.getSet("AB")));	
		
		Set<Character> closureSetAB = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("AB"));
		assertEquals(SetUtil.getSet("ABCD"), closureSetAB);	
	
	}
	
	@Test
	public void testKey9() {

		Relation relation = new Relation("ABCDE");
		relation.addFD(SetUtil.getSet("AB"), SetUtil.getSet("CD"));
		relation.addFD(SetUtil.getSet("E"), SetUtil.getSet("A"));
		relation.addFD(SetUtil.getSet("D"), SetUtil.getSet("A"));

		DBUtil.findKeys(relation);
		Set<Set<Character>> keys = relation.getKeys();
		assertEquals(1, keys.size());
			
		assertTrue(keys.contains(SetUtil.getSet("BE")));
		
		
		Set<Character> closureSetA = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("AB"));
		assertEquals(SetUtil.getSet("ABCD"), closureSetA);
		
		
		Set<Character> closureSetBC = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("BE"));
		assertEquals(SetUtil.getSet("ABCDE"), closureSetBC);
	}
	
	@Test
	public void testKeyAndNF1() {
	
		Relation relation = new Relation("ABCD");
		relation.addFD(SetUtil.getSet("ABC"), SetUtil.getSet("D"));
		relation.addFD(SetUtil.getSet("D"), SetUtil.getSet("A"));
		
		DBUtil.findKeys(relation);
		Set<Set<Character>> keys = relation.getKeys();
		assertEquals(2, keys.size());
		
		
		assertTrue(keys.contains(SetUtil.getSet("ABC")));
		assertTrue(keys.contains(SetUtil.getSet("BCD")));
		
		
		Set<Character> closureSetABC = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("ABC"));
		assertEquals(SetUtil.getSet("ABCD"), closureSetABC);
		
		
		Set<Character> closureSetBC = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("D"));
		assertEquals(SetUtil.getSet("DA"), closureSetBC);
		
		DBUtil.findNormalForm(relation);
		
		assertEquals(NormalForm.THIRD_NF, relation.getNormalForm());
		
	}
	
	@Test
	public void testKeyAndNF2() {

		Relation relation = new Relation("ABCD");
		relation.addFD(SetUtil.getSet("AB"), SetUtil.getSet("CD"));
		relation.addFD(SetUtil.getSet("D"), SetUtil.getSet("A"));
		
		DBUtil.findKeys(relation);
		Set<Set<Character>> keys = relation.getKeys();
		assertEquals(2, keys.size());
		
		assertTrue(keys.contains(SetUtil.getSet("AB")));
		assertTrue(keys.contains(SetUtil.getSet("BD")));
		
		
		Set<Character> closureSetAB = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("AB"));
		assertEquals(SetUtil.getSet("ABCD"), closureSetAB);
		
		Set<Character> closureSetBD = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("BD"));
		assertEquals(SetUtil.getSet("ABCD"), closureSetBD);
		
		DBUtil.findNormalForm(relation);
		
		assertEquals(NormalForm.THIRD_NF, relation.getNormalForm());
		
		
	}
	
	
	@Test
	public void testKeyAndN3() {
		Relation relation = new Relation("ABCDE");
		relation.addFD(SetUtil.getSet("AB"), SetUtil.getSet("CD"));
		relation.addFD(SetUtil.getSet("E"), SetUtil.getSet("A"));
		relation.addFD(SetUtil.getSet("D"), SetUtil.getSet("A"));
		
		DBUtil.findKeys(relation);
		Set<Set<Character>> keys = relation.getKeys();
		assertEquals(1, keys.size());
		
		assertTrue(keys.contains(SetUtil.getSet("BE")));

		Set<Character> closureSetAB = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("BE"));
		assertEquals(SetUtil.getSet("ABCDE"), closureSetAB);
		
		DBUtil.findNormalForm(relation);
	
		assertEquals(NormalForm.FIRST_NF, relation.getNormalForm());
	
	}
	
	@Test
	public void testKeyAndN4() {
		Relation relation = new Relation("ABCDE");
		relation.addFD(SetUtil.getSet("AB"), SetUtil.getSet("CD"));
		relation.addFD(SetUtil.getSet("E"), SetUtil.getSet("A"));
		relation.addFD(SetUtil.getSet("D"), SetUtil.getSet("A"));
		
		DBUtil.findKeys(relation);
		Set<Set<Character>> keys = relation.getKeys();
		assertEquals(1, keys.size());
		
		assertTrue(keys.contains(SetUtil.getSet("BE")));

		Set<Character> closureSetAB = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("BE"));
		assertEquals(SetUtil.getSet("ABCDE"), closureSetAB);
		
		DBUtil.findNormalForm(relation);

		assertEquals(NormalForm.FIRST_NF, relation.getNormalForm());
	}
		
		
		@Test
		public void testKeyAndN5() {
			Relation relation = new Relation("ABCD");
			relation.addFD(SetUtil.getSet("B"), SetUtil.getSet("C"));
			relation.addFD(SetUtil.getSet("D"), SetUtil.getSet("A"));
			
			DBUtil.findKeys(relation);
			Set<Set<Character>> keys = relation.getKeys();
			assertEquals(1, keys.size());
			
			assertTrue(keys.contains(SetUtil.getSet("BD")));

			Set<Character> closureSetAB = DBUtil.findClosure(relation.getConvertedNonTrivialFDs(), SetUtil.getSet("BD"));
			assertEquals(SetUtil.getSet("ABCD"), closureSetAB);
			
			DBUtil.findNormalForm(relation);
			
			//System.out.println(relation.getNormalForm().getName());
			assertEquals(NormalForm.FIRST_NF, relation.getNormalForm());
			
		//	for(FunctionDependency fd: relation.getOriginalFDs()){
		//		System.out.println("\t"+fd.toPrintableFormat() +" : "+ fd.getNormalForm().getName());
		//	}
	}

}
