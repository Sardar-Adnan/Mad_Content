import React, { useState } from 'react';
import { View, Text, TextInput, SectionList, TouchableOpacity, Modal, StyleSheet, SafeAreaView } from 'react-native';

const contacts = [
  { name: 'Ahmed', number: '03001234567', group: 'Family' },
  { name: 'Bilal', number: '03219876543', group: 'Friends' },
  { name: 'Usman', number: '03455566677', group: 'Work' },
  { name: 'Hassan', number: '03144455566', group: 'Family' },
  { name: 'Rizwan', number: '03011122233', group: 'Friends' },
  { name: 'Zubair', number: '03399988877', group: 'Work' },
  { name: 'Faisal', number: '03166677788', group: 'Family' },
  { name: 'Tariq', number: '03222233344', group: 'Friends' },
  { name: 'Kamran', number: '03433344455', group: 'Work' },
  { name: 'Imran', number: '03077788899', group: 'Family' },
];

const groupedContacts = () => {
  const groups = {};
  contacts.forEach(contact => {
    if (!groups[contact.group]) groups[contact.group] = [];
    groups[contact.group].push(contact);
  });
  return Object.keys(groups).map(group => ({ title: group, data: groups[group] }));
};

const ContactManager = () => {
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  const filteredContacts = groupedContacts().map(section => ({
    ...section,
    data: section.data.filter(contact =>
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.number.includes(search)
    ),
  })).filter(section => section.data.length > 0);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or number"
        value={search}
        onChangeText={setSearch}
      />
      <SectionList
        sections={filteredContacts}
        keyExtractor={(item, index) => item.number + index}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => setSelectedContact(item)}>
            <Text>{item.name} - {item.number}</Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
      <Modal visible={!!selectedContact} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Name: {selectedContact?.name}</Text>
            <Text style={styles.modalText}>Number: {selectedContact?.number}</Text>
            <Text style={styles.modalText}>Group: {selectedContact?.group}</Text>
            <TouchableOpacity onPress={() => setSelectedContact(null)} style={styles.closeButton}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  searchBar: { padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10, marginTop: 10 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  item: { padding: 10, borderBottomWidth: 1 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' },
  modalText: { fontSize: 16, marginBottom: 5 },
  closeButton: { marginTop: 10, padding: 10, backgroundColor: '#ddd', borderRadius: 5 },
});

export default ContactManager;
