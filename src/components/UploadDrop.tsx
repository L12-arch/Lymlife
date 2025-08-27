import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { colors } from '../theme';
import uploadStyles from '../styles/UploadDrop/index.styles';

const UploadDrop = ({
  images,
  onAdd,
}: {
  images: string[];
  onAdd: () => void;
}) => {
  return (
    <Pressable onPress={onAdd} style={uploadStyles.wrap}>
      {images.length === 0 ? (
        <>
          <View style={uploadStyles.icon} />
          <Text style={uploadStyles.title}>Upload Images</Text>
          <Text style={uploadStyles.sub}>Tap to add photos to your playlist</Text>
          <View style={uploadStyles.addBtn}>
            <Text style={{ fontWeight: '800', color: colors.primary2 }}>
              ＋ Add Image
            </Text>
          </View>
        </>
      ) : (
        <View style={uploadStyles.grid}>
          {images.map((uri, i) => (
            <Image
              key={uri + i}
              source={{ uri }}
              style={{
                width: '31%',
                aspectRatio: 1,
                borderRadius: 10,
                margin: '1%',
              }}
            />
          ))}
          <View style={[uploadStyles.addTile]}>
            <Text style={{ color: colors.sub, fontWeight: '700' }}>＋</Text>
            <Text style={{ color: colors.sub, fontSize: 12, marginTop: 4 }}>
              Add
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
}

export default UploadDrop;