import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";

// Standard fonts are used for stability
const styles = StyleSheet.create({
  page: {
    padding: 25,
    backgroundColor: "#F1F5F9",
  },
  certificateContainer: {
    border: "14pt solid #FFD93D",
    height: "100%",
    padding: 20,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    fontFamily: "Helvetica",
  },
  innerBorder: {
    position: "absolute",
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    border: "2pt solid #6BCBFF",
  },
  header: {
    textAlign: "center",
    marginBottom: 15,
    marginTop: 10,
    alignItems: "center",
  },
  hurrah: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#FF6B6B",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  title: {
    fontSize: 38,
    fontFamily: "Helvetica-Bold",
    color: "#0F172A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 15,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  awardText: {
    fontSize: 12,
    color: "#334155",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 50,
    lineHeight: 1.6,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginBottom: 25,
  },
  statBox: {
    backgroundColor: "#FFFBEB",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
    border: "2pt solid #FFD93D",
    minWidth: 140,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 9,
    color: "#92400E",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#B45309",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
    flex: 1,
  },
  itemCard: {
    backgroundColor: "#F8FAFC",
    border: "1pt solid #E2E8F0",
    borderRadius: 8,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  itemImage: {
    borderRadius: 4,
    objectFit: "cover",
  },
  itemLetter: {
    fontFamily: "Helvetica-Bold",
    color: "#0F172A",
  },
  itemWord: {
    color: "#64748B",
  },
  footer: {
    marginTop: "auto",
    width: "100%",
    alignItems: "center",
    paddingBottom: 10,
  },
  homeFooterClone: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#F8FAFC",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    border: "1pt solid #E2E8F0",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    border: "1.5pt solid #6BCBFF",
  },
  avatarDeer: {
    borderColor: "#FF6B8A",
  },
  footerText: {
    fontSize: 10,
    color: "#64748B",
    fontWeight: "bold",
  },
  heartIcon: {
    width: 10,
    height: 10,
    marginHorizontal: 2,
  },
  branding: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#6BCBFF",
    marginTop: 8,
  },
});

interface Item {
  letter: string;
  word: string;
  image: string;
  color: string;
}

interface ProgressReportProps {
  items: Item[];
  mode: string;
  userName: string;
}

export const ProgressReport: React.FC<ProgressReportProps> = ({
  items,
  mode,
  userName,
}) => {
  const baseUrl = globalThis.location?.origin || "http://localhost:5173";
  const heartImg = "https://img.icons8.com/emoji/48/heart-suit.png";

  const itemCount = items.length;
  let cardSize = 80;
  let imgSize = 45;
  let fontSize = 16;
  let wordSize = 8;

  if (itemCount > 12) {
    cardSize = 65;
    imgSize = 35;
    fontSize = 12;
    wordSize = 6;
  }
  if (itemCount > 24) {
    cardSize = 50;
    imgSize = 28;
    fontSize = 10;
    wordSize = 0;
  }

  const getModeLabel = (mode: string) => {
    switch (mode) {
      case "urdu":
        return " Urdu Letters ";
      case "numbers":
        return " Numbers ";
      default:
        return " English Alphabet ";
    }
  };

  const modeLabel = getModeLabel(mode);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.certificateContainer}>
          <View style={styles.innerBorder} />

          <View style={styles.header}>
            <Text style={styles.hurrah}>HURRAH! {userName.toUpperCase()} Did It!</Text>
            <Text style={styles.title}>Certificate of Achievement</Text>
            <Text style={styles.subtitle}>TinyTaleem Learning Academy</Text>
          </View>

          <View style={{ marginBottom: 15, alignItems: 'center' }}>
            <Text style={{ fontSize: 10, color: '#64748B', textTransform: 'uppercase', marginBottom: 5 }}>This is to certify that</Text>
            <Text style={{ fontSize: 24, fontFamily: 'Helvetica-Bold', color: '#7C3AED', textTransform: 'capitalize' }}>{userName}</Text>
          </View>

          <Text style={styles.awardText}>
            has successfully mastered the
            {modeLabel}
            lessons. Your hard work and dedication have earned you the rank of
            Superstar!
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Lessons Mastered</Text>
              <Text style={styles.statValue}>{itemCount}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Current Rank</Text>
              <Text style={styles.statValue}>Superstar ⭐</Text>
            </View>
          </View>

          <View style={styles.grid}>
            {items.map((item, index) => (
              <View
                key={`report-item-${item.letter}-${index}`}
                style={[
                  styles.itemCard,
                  { width: cardSize, height: cardSize + 15 },
                ]}
              >
                <Image
                  src={
                    item.image.startsWith("http")
                      ? item.image
                      : `${baseUrl}${item.image}`
                  }
                  style={[
                    styles.itemImage,
                    { width: imgSize, height: imgSize },
                  ]}
                />
                <Text style={[styles.itemLetter, { fontSize }]}>
                  {item.letter}
                </Text>
                {wordSize > 0 && (
                  <Text style={[styles.itemWord, { fontSize: wordSize }]}>
                    {item.word}
                  </Text>
                )}
              </View>
            ))}
          </View>

          <View style={styles.footer}>
            <View style={styles.homeFooterClone}>
              <Image
                src={`${baseUrl}/assets/images/deer.jpeg`}
                style={[styles.avatar, styles.avatarDeer]}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.footerText}>Made with</Text>
                <Image src={heartImg} style={styles.heartIcon} />
                <Text style={styles.footerText}>for Dheer and Rafay</Text>
              </View>
              <Image
                src={`${baseUrl}/assets/images/rafay.jpeg`}
                style={styles.avatar}
              />
            </View>
            <Text style={styles.branding}>TinyTaleem Academy</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
