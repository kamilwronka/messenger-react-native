import React from "react";
import { Image, View, Text } from "react-native";
import config from "@/config/api_config";
import { prepareAvatar } from "@/helpers";
import { AvatarSizes } from "@/constants";

const getSize = size => {
  switch (size) {
    case "small":
      return AvatarSizes.small;
    case "large":
      return AvatarSizes.large;
    case "medium":
    default:
      return AvatarSizes.medium;
  }
};

const Avatar = ({ imgUrl, name, color, size }) => {
  const formattedSize = getSize(size);

  return (
    <View>
      {imgUrl ? (
        <Image
          style={{
            height: formattedSize,
            width: formattedSize,
            borderRadius: 28
          }}
          source={{
            uri: config.BUCKET_URL + imgUrl
          }}
        />
      ) : (
        <View
          style={{
            borderRadius: 28,
            backgroundColor: color,
            height: formattedSize,
            width: formattedSize,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: "#fff", fontSize: 24 }}>
            {prepareAvatar(name)}
          </Text>
        </View>
      )}
      <View
        style={{
          position: "absolute",
          backgroundColor: "#00FF11",
          height: 14,
          width: 14,
          borderRadius: 7,
          right: 2,
          bottom: 2
        }}
      />
    </View>
  );
};

Avatar.defaultProps = {
  imgUrl: null,
  name: "",
  color: "#912F56",
  size: "medium"
};

export default Avatar;
